import flask
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
import time
from flask_pymongo import PyMongo
import pymongo
import urllib
# import os

# passwordvalue = os.environ.get("DB_ENV")

client = pymongo.MongoClient("mongodb+srv://pramit25:" + urllib.parse.quote("Pram@197058") + "@cluster0.nyi9mlm.mongodb.net/?retryWrites=true&w=majority")
db = client["Cluster0"]

collection = db["customers"]


@app.route("/")
@cross_origin()
def hello():
    return flask.render_template("index.html")

@app.route("/leaderboard/<name>/<score>")
@cross_origin()
def leaderboard(name, score):
    new_score = {"Name" : name, "Score" : score}
    collection.insert_one(new_score)
    cursor = collection.find({})
    all = []
    for document in cursor:
        all.append(document)
    return flask.render_template("leaderboard.html", p_name=name, p_score=score, all=all)