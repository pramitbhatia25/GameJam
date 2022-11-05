import flask
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
import time

@app.route("/")
@cross_origin()
def hello():
    return flask.render_template("index.html")

@app.route("/p")
@cross_origin()
def p():
    return flask.render_template("p.html", a=5)