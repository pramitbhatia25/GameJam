import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin
import time
from flask_pymongo import PyMongo
import pymongo
import urllib
from PIL import Image
import requests
# import os
# import openai

app = Flask(__name__)
# openai.api_key = os.getenv("OPENAI_API_KEY")

client = pymongo.MongoClient("mongodb+srv://pramit25:" + urllib.parse.quote("Pram@197058") + "@cluster0.nyi9mlm.mongodb.net/?retryWrites=true&w=majority")
db = client["Cluster0"]

collection = db["customers"]


@app.route("/<name>", methods=['GET'])
@cross_origin()
def hello(name):
    # response = requests.get("http://127.0.0.1:5000/image_generation", headers={'prompt': name})
    # im = Image.open(requests.get(response.content, stream=True).raw)    
    # im.save("./static/players/test.png")
    return flask.render_template("index.html", name=name)

# @app.route("/image_generation", methods=("GET", "POST"))
# def img():
#     response = openai.Image.create(
#     prompt=request.headers['Prompt'],
#     n=1,
#     size="1024x1024"
#     )
#     image_url = response['data'][0]['url']    
#     print("URL:", image_url)
#     return image_url

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