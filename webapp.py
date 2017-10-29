import random
import sys
import textAnalysis
from flask import Flask, send_file, session, request, template_rendered, render_template, jsonify
from models import User, UserList, QueueList, ComplaintList

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/registerUser", methods=['POST'])
def registerUser():
    newUser = User(request.json['username'], request.json['password'], request.json['email'])
    userList = UserList()
    userList.addUser(newUser)
    return "User added"

@app.route("/api/checkUsernameAvailable", methods=['POST'])
def checkUsernameAvailable():
    username = request.json['username']
    userList = UserList()
    if(username in userList.keys()):
        return "not_available"
    return "available"

@app.route("/api/getUserDetails")
def getUserDetails():
    username = request.json['username']
    userList = UserList()
    return jsonify(userList[username])

@app.route("/api/authenticateUser", methods=['POST'])
def authenticateUser():
    userList = UserList()
    username = request.json['username']
    password = request.json['password']
    if(userList.authenticateUser(username, password)):
        print("authenticated", file=sys.stderr)
        return "authenticated"
    else:
        print("not authenticated", file=sys.stderr)
        return "not_authenticated"

@app.route("/api/postComplaint", methods=['POST'])
def postComplaint():
    complaint = request.json['complaint']
    username = request.json['username']
    complaint = textAnalysis.makePositive(complaint)
    complaintList = ComplaintList()
    complaintList.addComplaint(username, complaint)
    return complaint

@app.route("/api/getComplaints")
def getComplaints():
    complaintList = ComplaintList()
    return jsonify(complaintList.complaintDict)

@app.route("/api/addToQueue")
def addToQueue():
    if(not session.has_key('QueueID')):
        queueID = random.randint(0, 1000000)
        session['QueueID'] = queueID
        queueList = QueueList()
        queueList.addToQueue(queueID)
        return "Added to the queue"
    else:
        return "Already in queue"

@app.route("/api/getQueuePosition")
def getQueuePosition():
    if(session.has_key('QueueID')):
        queueList = QueueList()
        return queueList.getQueuePosition(session['QueueID'])
    else:
        return -1

@app.route("/api/leaveQueue")
def leaveQueue():
    session.pop('QueueID', None)
    return "Left Queue"

if __name__ == "__main__":
    app.run(host='0.0.0.0')