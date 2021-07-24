import ast
import datetime
from os import error

def create_payload():
    # Fetch metadata
    with open('config/metadata.txt', 'r') as f:
        contents = f.read()
        metadata = ast.literal_eval(contents)
    date = metadata.get('from')

    # Return payload
    if(date == '-1'):
        return fetch_day_one()
    else:
        return fetch_by_time(datetime.datetime.strptime(date, '%Y-%m-%d'))

def fetch_day_one():
    # Set up payload
    payload = {}
    payload['params'] = {}
    payload['url'] = 'https://api.covid19api.com/dayone/country/indonesia'

    # Create updated metadata
    current_date = datetime.datetime.now().strftime('%Y-%m-%d')
    updated_metadata = f"{{'from':'{current_date}'}}"

    return payload, updated_metadata

def fetch_by_time(from_date):
    # Set up date params
    to_date = datetime.datetime.now() - datetime.timedelta(hours=8)
    from_date_param = from_date.isoformat()
    to_date_param = to_date.isoformat()

    # Raise error on invalid date params
    if(to_date < from_date):
        print("\nInvalid date params\n")
        raise error

    # Set up payload
    payload = {}
    payload['params'] = {'from':from_date_param,'to':to_date_param}
    payload['url'] = 'https://api.covid19api.com/country/indonesia'

    # Create updated metadata
    current_date = to_date.strftime('%Y-%m-%d')
    updated_metadata = f"{{'from':'{current_date}'}}"

    return payload, updated_metadata