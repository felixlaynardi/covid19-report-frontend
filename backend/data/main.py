import db
import api

if __name__ == '__main__':
    # Generate table
    db.generate_table()

    # Fetch data from api and updated metadata
    data, updated_metadata  = api.fetch_data()

    # Upsert data into db and update metadata
    db.upsert_data(data, updated_metadata)