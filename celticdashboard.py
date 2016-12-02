from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os


# all the information that is blanked out is to get it to run to the local host. The extra inform is to get it move from Monglab into
# heroku
app = Flask(__name__)

MONGODB_URI = os.getenv('MONGODB_URI')
# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'celticHistory'
DBS_NAME = os.getenv('MONGO_DB_NAME' ,'celticHistory')

# COLLECTION_NAME = 'projects'
COLLECTION_NAME = 'projects'
FIELDS = {'Name': True, 'Nationality': True, 'Position': True, 'Career Start': True,
          'Career Finish': True, 'Appearances': True, 'Goals': True, 'Transfers out': True, 'Transfer in': True,
          'Club Captain': True, 'Greatest ever Celtic': True, 'Scotland 25 caps': True, '_id':False}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/celticHistory/json")
def donor_projects():
    # connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    connection = MongoClient(MONGODB_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=55000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)
