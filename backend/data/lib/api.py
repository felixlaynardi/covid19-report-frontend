import lib.payload as payload
import requests
import json

def fetch_data():
    request_payload, updated_metadata = payload.create_payload()
    response = requests.get(request_payload.get('url'), params=request_payload.get('params'))
    
    return response.json(), updated_metadata