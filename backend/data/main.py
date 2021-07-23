import db
import api

if __name__ == '__main__':
    # Generate table
    db.generate_table()

    # Fetch data from api
    data = api.fetch_data()

    # Upsert data into db
    db.upsert_data(data)