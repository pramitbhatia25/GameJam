import flask
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)

@app.route("/")
@cross_origin()
def hello():
    return flask.render_template("index.html")

@app.route("/p")
def helloP():
    a = "app"
    return flask.render_template("p.html", a=a)
