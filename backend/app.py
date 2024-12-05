from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
import requests

app = Flask(__name__)
CORS(app)

# Proxy fix för Vercel
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1)

@app.route("/campaigns", methods=["GET"])
def get_campaigns():
    try:
        store_id = request.args.get("store_id", default=None, type=str)
        if not store_id:
            return jsonify({"error": "Missing 'store_id' parameter"}), 400

        # URL för att hämta data från Willys API
        url = f"https://www.willys.se/search/campaigns/offline?q={store_id}&type=PERSONAL_GENERAL&page=0&size=500"
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        # Kontrollera att Willys API returnerar JSON
        data = response.json()
        if not isinstance(data, dict) or 'results' not in data:
            return jsonify({"error": "Unexpected response format"}), 500

        return jsonify(data["results"])  # Returnera endast resultaten

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch data from Willys API", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
