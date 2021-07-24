import psycopg2
import psycopg2.extras
import ast
import datetime

# Import db config from config.txt
with open('config.txt', 'r') as f:
    contents = f.read()
    db_config = ast.literal_eval(contents)

def db_connection():
    try:
        # Get connection from db config
        psycopg2.extras.register_uuid()
        conn = psycopg2.connect(**db_config, connect_timeout=10)
    except Exception as e:
        raise e
    return conn

def generate_table():
    # Prepare sql string
    sql_string = """
    CREATE TABLE IF NOT EXISTS covid19_data(
        ID              UUID PRIMARY KEY UNIQUE NOT NULL,
        Country         VARCHAR(255) NOT NULL,
        CountryCode     VARCHAR(255) NOT NULL,
        Province        VARCHAR(255) NOT NULL,
        City            VARCHAR(255) NOT NULL,
        CityCode        VARCHAR(255) NOT NULL,
        Lat             VARCHAR(255) NOT NULL,
        Lon             VARCHAR(255) NOT NULL,
        Confirmed       BIGINT NOT NULL,
        Deaths          BIGINT NOT NULL,
        Recovered       BIGINT NOT NULL,
        Active          BIGINT NOT NULL,
        Date            TIMESTAMPTZ
    );
    """

    # Get connection
    conn = db_connection()
    cur = conn.cursor()

    try:
        # Execute generate table query
        cur.execute(sql_string)

        conn.commit()
    except Exception as e:
        # Rollback on exception
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()

def upsert_data(data, updated_metadata):
    # Get connection
    conn = db_connection()
    cur = conn.cursor()

    # Generate sql values from data
    sql_values = ""
    # Loop through list of data
    for idx, dict in enumerate(data):
        sql_values += "("
        # Loop through values of dictionary inside the list
        for dict_idx, value in enumerate(dict.values()):
            if(value == None):
                sql_values += "NULL"
            elif(not isinstance(value, int)):
                sql_values = sql_values + "'" + str(value) + "'"
            else:
                sql_values += str(value)
            if(dict_idx != len(dict.values()) - 1):
                sql_values += ","
        sql_values += ")"
        if(idx != len(data) - 1):
            sql_values += ","

    # Prepare sql string
    sql_string = f"INSERT INTO covid19_data (ID, Country, CountryCode, Province, City, CityCode, Lat, Lon, Confirmed, Deaths, Recovered, Active, Date) VALUES {sql_values} ON CONFLICT (ID) DO UPDATE SET Confirmed = EXCLUDED.Confirmed, Deaths = EXCLUDED.Deaths, Recovered = EXCLUDED.Recovered, Active = EXCLUDED.Active;"

    try:
        # Execute the insertion query
        cur.execute(sql_string)

        conn.commit()
        print("Data has been upserted")

        # Update metadata
        with open("metadata.txt",'w') as f:
            f.write(updated_metadata)
        print("Metadata has been updated")
    except Exception as e:
        # Rollback on exception
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()