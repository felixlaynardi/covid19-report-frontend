import psycopg2
import psycopg2.extras
import ast

with open('config.txt') as f:
    contents = f.read()
    db_config = ast.literal_eval(contents)

def db_connection():
    try:
        psycopg2.extras.register_uuid()
        conn = psycopg2.connect(**db_config, connect_timeout=10)
    except Exception as e:
        raise e
    return conn