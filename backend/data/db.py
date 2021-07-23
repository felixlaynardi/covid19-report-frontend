import psycopg2
import psycopg2.extras
import ast
import datetime

# Import db config from config.txt
with open('config.txt') as f:
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

def upsert_data(data):
    # Get connection
    # conn = db_connection()
    # cur = conn.cursor()

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
    sql_string = f"INSERT INTO covid19_data (ID, Country, CountryCode, Province, City, CityCode, Lat, Lon, Confirmed, Deaths, Recovered, Active, Date) VALUES {sql_values}"

    print(sql_string)

    # try:
    #     # Execute the insertion query
    #     cur.execute(sql_string)

    #     conn.commit()
    #     print("Data has been upserted")
    # except Exception as e:
    #     # Rollback on exception
    #     conn.rollback()
    #     raise e
    # finally:
    #     cur.close()
    #     conn.close()

if __name__ == '__main__':
    ls = []
    date = datetime.datetime.now()
    dict = {'ID':'1','Country':'a','CountryCode':None,'Province':'b','City':'c','CityCode':'d','Lat':None,'Lon':None,'Confirmed':1,'Deaths':2,'Recovered':3,'Active':4,'Date':date}
    ls.append(dict)
    ls.append(dict)
    ls.append(dict)
    upsert_data(ls)