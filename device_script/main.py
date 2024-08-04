import os
import uuid
import time
import json
import requests
import websocket
import threading

UUID_FILE_PATH = "device-uuid.txt"

def get_or_create_uuid():
    if os.path.exists(UUID_FILE_PATH):
        with open(UUID_FILE_PATH, 'r') as file:
            return file.read().strip()
    else:
        new_uuid = str(uuid.uuid4())
        with open(UUID_FILE_PATH, 'w') as file:
            file.write(new_uuid)
        return new_uuid

API_URL = os.getenv("API_URL")
GET_URL = f"http://{API_URL}/devices" if API_URL else None

def create_device(id):
    if not API_URL:
        print("Error: API_URL environment variable is not set or is empty.")
        return

    json_payload = json.dumps({"name":"test","uuid":id,"ip_address":"test"})
    headers = {"Accept": "application/json", "Content-Type": "application/json"}

    try:
        response = requests.post(GET_URL, data=json_payload, headers=headers)
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
    except requests.RequestException as e:
        print(e)

def get_cpu_temperature():
    temp_file = "/sys/class/thermal/thermal_zone0/temp"
    try:
        with open(temp_file, 'r') as file:
            line = file.readline().strip()
            return float(line) / 1000.0 if line else float('nan')
    except FileNotFoundError:
        return float('nan')

class WebSocketClientManager:
    def __init__(self, server_uri):
        self.server_uri = server_uri
        self.ws = None
        self.connected = False

    def on_open(self, ws):
        print("Connected to WebSocket server")
        self.connected = True

    def on_message(self, ws, message):
        print(f"Received message: {message}")

    def on_close(self, ws, close_status_code, close_msg):
        print("Disconnected from WebSocket server")
        self.connected = False

    def on_error(self, ws, error):
        print(error)
        self.connected = False

    def connect_and_run(self):
        def run_forever():
            while True:
                self.ws = websocket.WebSocketApp(
                    self.server_uri,
                    on_open=self.on_open,
                    on_message=self.on_message,
                    on_close=self.on_close,
                    on_error=self.on_error,
                )
                self.ws.run_forever()
                time.sleep(5)  # Wait before reconnecting

        threading.Thread(target=run_forever).start()

    def send_data(self, data):
        if self.connected:
            try:
                self.ws.send(data)
                print(f"Sent data: {data}")
            except Exception as e:
                print(f"WebSocket error: {e}")
        else:
            print("WebSocket is not connected, cannot send data")

if __name__ == "__main__":
    device_id = get_or_create_uuid()

    api_url = os.getenv("API_URL")
    if not api_url:
        raise ValueError("WebSocket server address not specified in environment variables")

    server_uri = f"ws://{api_url}/?deviceId={device_id}"

    create_device(device_id)

    client_manager = WebSocketClientManager(server_uri)
    client_manager.connect_and_run()

    while True:
        cpu_temp = get_cpu_temperature()
        data = json.dumps({"cpu_temperature": round(cpu_temp, 2)})
        client_manager.send_data(data)
        time.sleep(10)
