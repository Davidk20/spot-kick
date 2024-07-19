from flask import Flask, Response
from flask_cors import CORS
from backend.services.data_parser import parse_points

app = Flask(__name__)
cors = CORS(app, resources={r"/points": {"origins": "http://localhost:5173/"}})
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/points")
def points():
    return Response(parse_points(), mimetype="application/json")
