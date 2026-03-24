import sqlite3

DB_NAME = "analysis.db"

conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# Check table exists
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables:", tables)

# Fetch all saved analyses
cursor.execute("SELECT * FROM analysis_requests ORDER BY id DESC")
rows = cursor.fetchall()

print("\nDatabase content:")
for row in rows:
    print(row)

conn.close()