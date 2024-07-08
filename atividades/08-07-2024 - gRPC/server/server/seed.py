from sqlalchemy import create_engine, text

# Database connection
url = "postgresql+psycopg2://admin:password@localhost:5432/app"
engine = create_engine(url)
conn = engine.connect()

# Seed data
seed_data = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "password": "alice123",
    },
    {"name": "Bob Smith", "email": "bob.smith@example.com", "password": "bob123"},
    {
        "name": "Charlie Brown",
        "email": "charlie.brown@example.com",
        "password": "charlie123",
    },
    {
        "name": "Diana Prince",
        "email": "diana.prince@example.com",
        "password": "diana123",
    },
    {"name": "Eve Adams", "email": "eve.adams@example.com", "password": "eve123"},
]

# Insert seed data
try:
    for user in seed_data:
        conn.execute(
            text(
                "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)"
            ),
            user,
        )
    print("Seed data successfully inserted.")
except Exception as e:
    print(f"Error inserting seed data: {e}")

# Close connection
conn.close()
