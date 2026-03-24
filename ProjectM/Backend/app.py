import os
import re
import json
from collections import Counter

import sqlite3
import requests
import nltk
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS

from database import (
    init_db,
    register_user,
    login_user,
    create_request,
    get_all_requests,
    get_user_requests,
    get_all_users,
    delete_user,
    update_request_result
)

from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# ----------------------------
# NLTK SETUP (VERCEL COMPATIBLE)
# ----------------------------
# Point to local folder for read-only environments
nltk_path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(nltk_path)

try:
    STOP_WORDS = set(stopwords.words("english"))
    sid = SentimentIntensityAnalyzer()
except LookupError:
    # This block triggers if the files aren't in nltk_data yet
    nltk.download("stopwords", download_dir=nltk_path, quiet=True)
    nltk.download("vader_lexicon", download_dir=nltk_path, quiet=True)
    STOP_WORDS = set(stopwords.words("english"))
    sid = SentimentIntensityAnalyzer()

app = Flask(__name__)
CORS(app)

init_db()

# ----------------------------
# NLTK SETUP
# ----------------------------
try:
    STOP_WORDS = set(stopwords.words("english"))
except:
    nltk.download("stopwords", quiet=True)
    STOP_WORDS = set(stopwords.words("english"))

try:
    sid = SentimentIntensityAnalyzer()
except:
    nltk.download("vader_lexicon", quiet=True)
    sid = SentimentIntensityAnalyzer()

# ----------------------------
# TEXT ANALYSIS FUNCTION (🔥 FIXED)
# ----------------------------
def analyze_text(text):
    reviews = text.split("\n")
    results = []

    pos = neu = neg = 0

    pos_words = []
    neg_words = []

    for r in reviews:
        r = r.strip()
        if not r:
            continue

        score = sid.polarity_scores(r)["compound"]

        if score >= 0.05:
            pos += 1
            sentiment = "positive"
        elif score <= -0.05:
            neg += 1
            sentiment = "negative"
        else:
            neu += 1
            sentiment = "neutral"

        # تنظيف النص
        clean = re.sub(r"[^\w\s]", "", r.lower())

        # ❌ remove stopwords
        words = [
            w for w in clean.split()
            if w not in STOP_WORDS and len(w) > 2
        ]

        # 🔥 sentiment-based keyword collection
        if sentiment == "positive":
            pos_words.extend(words)
        elif sentiment == "negative":
            neg_words.extend(words)

        results.append({
            "original": r,
            "cleaned": clean,
            "sentiment": sentiment
        })

    total = len(results) if results else 1

    # 🔥 meaningful keywords only
    keyword_counts = Counter(pos_words + neg_words).most_common(10)

    return {
        "reviews": results,
        "positive_percent": round((pos / total) * 100, 2),
        "neutral_percent": round((neu / total) * 100, 2),
        "negative_percent": round((neg / total) * 100, 2),
        "keywords": dict(keyword_counts)
    }

# ----------------------------
# AUTH
# ----------------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if email == "diyarane12@gmail.com" and password == "123456":
        return jsonify({
            "role": "admin",
            "name": "Admin",
            "email": email
        })

    user = login_user(email, password)

    if user:
        return jsonify({
            "role": "user",
            "name": user[1],
            "email": user[2]
        })

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    success = register_user(
        data["name"],
        data["email"],
        data["password"]
    )

    if success:
        return jsonify({"message": "User registered"})
    return jsonify({"error": "Email exists"}), 400


# ----------------------------
# USER REQUEST
# ----------------------------
@app.route("/api/request-analysis", methods=["POST"])
def request_analysis():
    data = request.json

    create_request(
        data["name"],
        data["email"],
        data["product_name"],
        data["source"]
    )

    return jsonify({"message": "Request sent"})


# ----------------------------
# ADMIN REQUEST LIST
# ----------------------------
@app.route("/api/admin/requests", methods=["GET"])
def admin_requests():
    rows = get_all_requests()

    return jsonify([{
        "id": r[0],
        "user_name": r[1],
        "email": r[2],
        "product_name": r[3],
        "source": r[4],
        "status": r[5],
        "result": r[6],
        "created_at": r[7]
    } for r in rows])


# ----------------------------
# ADMIN ANALYZE (🔥 FIXED HTML SCRAPING)
# ----------------------------
@app.route("/api/admin/analyze/<int:req_id>", methods=["POST"])
def admin_analyze(req_id):
    conn = sqlite3.connect("analysis.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT product_name, source
        FROM analysis_requests
        WHERE id=?
    """, (req_id,))

    row = cursor.fetchone()

    if not row:
        return jsonify({"error": "Not found"}), 404

    product_name, source = row

    # 🔥 FIXED SCRAPING
    if source.startswith("http"):
        try:
            res = requests.get(source)
            soup = BeautifulSoup(res.text, "html.parser")

            # ❌ remove unwanted tags
            for tag in soup(["script", "style", "h1", "h2", "h3", "title"]):
                tag.decompose()

            # ✅ only take paragraphs
            paragraphs = soup.find_all("p")
            text = "\n".join([p.get_text() for p in paragraphs])

        except:
            text = source
    else:
        text = source

    result = analyze_text(text)

    update_request_result(req_id, json.dumps(result), "completed")

    return jsonify({"message": "Analysis complete"})


# ----------------------------
# USER RESULTS
# ----------------------------
@app.route("/api/user/results/<email>", methods=["GET"])
def user_results(email):
    rows = get_user_requests(email)

    data = []

    for r in rows:
        result = json.loads(r[2]) if r[2] else None

        data.append({
            "product_name": r[0],
            "status": r[1],
            "result": result,
            "date": r[3]
        })

    return jsonify(data)


# ----------------------------
# ADMIN USERS
# ----------------------------
@app.route("/api/admin/users", methods=["GET"])
def get_users():
    users = get_all_users()
    return jsonify([
        {"id": u[0], "name": u[1], "email": u[2]}
        for u in users
    ])


@app.route("/api/admin/users/<int:id>", methods=["DELETE"])
def delete_user_route(id):
    delete_user(id)
    return jsonify({"message": "User deleted"})


# ----------------------------
# PRODUCT HISTORY
# ----------------------------
@app.route("/api/history", methods=["GET"])
def history():
    conn = sqlite3.connect("analysis.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, product_name, source, status, result, created_at
        FROM analysis_requests
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    data = []

    for r in rows:
        result = json.loads(r[4]) if r[4] else None

        data.append({
            "id": r[0],
            "product_name": r[1],
            "source": r[2],
            "status": r[3],
            "result": result,
            "total_reviews": len(result["reviews"]) if result else 0,
            "positive": result["positive_percent"] if result else 0,
            "neutral": result["neutral_percent"] if result else 0,
            "negative": result["negative_percent"] if result else 0,
            "keywords": result["keywords"] if result else {},
            "date": r[5]
        })

    return jsonify(data)


# ----------------------------
# RUN
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True)