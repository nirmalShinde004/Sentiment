import sqlite3

DB_NAME = "analysis.db"


def get_connection():
    return sqlite3.connect(DB_NAME)


# ----------------------------
# INIT DB
# ----------------------------
def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # USERS
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    # REQUESTS (MAIN TABLE 🔥)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS analysis_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT,
        email TEXT,
        product_name TEXT,
        source TEXT,
        status TEXT DEFAULT 'pending',
        result TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()


# ----------------------------
# AUTH
# ----------------------------
def register_user(name, email, password):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, password),
        )
        conn.commit()
        return True
    except:
        return False
    finally:
        conn.close()


def login_user(email, password):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, name, email FROM users WHERE email=? AND password=?",
        (email, password),
    )

    user = cursor.fetchone()
    conn.close()
    return user


# ----------------------------
# REQUEST SYSTEM
# ----------------------------
def create_request(user_name, email, product_name, source):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO analysis_requests (user_name, email, product_name, source, status)
    VALUES (?, ?, ?, ?, 'pending')
    """, (user_name, email, product_name, source))

    conn.commit()
    conn.close()


def get_all_requests():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM analysis_requests ORDER BY id DESC")
    rows = cursor.fetchall()

    conn.close()
    return rows


def update_request_result(req_id, result_json, status="completed"):
    conn = sqlite3.connect("analysis.db")
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE analysis_requests
        SET result = ?, status = ?
        WHERE id = ?
    """, (result_json, status, req_id))

    conn.commit()  # ❗ VERY IMPORTANT
    conn.close()


def get_user_requests(email):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT product_name, status, result, created_at
    FROM analysis_requests
    WHERE email=?
    ORDER BY id DESC
    """, (email,))

    rows = cursor.fetchall()
    conn.close()

    return rows


# ----------------------------
# ADMIN USERS
# ----------------------------
def get_all_users():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, email FROM users")
    rows = cursor.fetchall()

    conn.close()
    return rows


def delete_user(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()