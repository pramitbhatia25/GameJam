import flask
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
import time

@app.route("/")
@cross_origin()
def hello():
    return flask.render_template("index.html")

@app.route("/leaderboard")
@cross_origin()
def leaderboard():
    return flask.render_template("leaderboard.html", a=5)