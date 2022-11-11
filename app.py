import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
import time
from flask_pymongo import PyMongo
import pymongo
import urllib

client = pymongo.MongoClient("mongodb+srv://pramit25:" + urllib.parse.quote("Pram@197058") + "@cluster0.nyi9mlm.mongodb.net/?retryWrites=true&w=majority")
db = client["Cluster0"]

collection = db["customers"]


@app.route("/<name>", methods=['GET'])
@cross_origin()
def hello(name):
    return flask.render_template("index.html", name=name)

@app.route("/")
@cross_origin()
def home():
    return flask.render_template("home.html")

@app.route("/leaderboard/", methods=["GET", "POST"])
@cross_origin()
def leaderboard():
    cursor = collection.find({})
    all = []
    for document in cursor:
        all.append(document)
    if request.method == 'POST':
        name = request.json['name']
        score = request.json['score']
        date = request.json['date']
        new_score = {"Name" : name, "Score" : score, 'Date': date}
        collection.insert_one(new_score)
        print("POSTED NEW ENTRY")
        all = sorted(all, key=lambda i: (i['Score'], i['Date'], i['Name']))
        # all = [{'Name': "pr", 'Score': "23"},]
        return flask.render_template("leaderboard.html", all=all)
    if(request.method == 'GET'):
        all = sorted(all, key=lambda i: (i['Score'], i['Date'], i['Name']))
        return flask.render_template("leaderboard.html", all=all)