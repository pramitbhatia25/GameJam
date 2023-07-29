import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin
import time
from flask_pymongo import PyMongo
import pymongo
import urllib
from PIL import Image
import requests
import os
import openai

db_key = os.getenv("DB_KEY")

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

client = pymongo.MongoClient("mongodb+srv://pramit25:kTkHK4d1NxposPwP@app.wzujqrt.mongodb.net/")
db = client["app"]

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
        deaths = request.json['deaths']
        new_score = {"Name" : name, "Score" : score, 'Date': date, "Deaths": deaths}
        collection.insert_one(new_score)
        print("POSTED NEW ENTRY")
        all = sorted(all, key=lambda i: (i['Score'], i['Deaths'], i['Date'], i['Name']))
        # all = [{'Name': "pr", 'Score': "23", 'Date':'May 2222', 'Name': 'Pr'}]
        return flask.render_template("leaderboard.html", all=all)
    if(request.method == 'GET'):
        all = sorted(all, key=lambda i: (i['Score'], i['Deaths'], i['Date'], i['Name']))
        # all = [{'Name': "pr", 'Score': "23", 'Deaths': 3, 'Date':'May 2222'}]
        return flask.render_template("leaderboard.html", all=all)