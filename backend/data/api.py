import payload
import requests
import json

def fetch_data():
    request_payload = payload.create_payload()
    response = requests.get(request_payload.get('url'), params=request_payload.get('params'))
    
    return response.json()