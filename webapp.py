import random
import sys
import textAnalysis
from flask import Flask, session, request, render_template, jsonify
from models import User, UserList, QueueList, ComplaintList

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/admin/adminComplaints")
def adminComplaints():
    return render_template("adminComplaints.html")

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
    if(username in userList.userList.keys()):
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
    complaintList = ComplaintList()
    complaintList.addComplaint(username, complaint)
    return "Successfully_stored"

@app.route("/api/getPositiveComplaint", methods=['POST'])
def getPositiveComplaint():
    complaint = request.json['complaint']
    complaint = textAnalysis.makePositive(complaint)
    return complaint

@app.route("/api/getCorrectSpelling", methods=['POST'])
def getCorrectSpelling():
    text = request.json['text']
    return textAnalysis.correctSpelling(text)

@app.route("/api/postEvaluation", methods=['POST'])
def postEvaluation():
    complaint = request.json['complaint']
    firstname = request.json['firstname']
    surname = request.json['surname']
    textAnalysis.makePositive(complaint)
    evaluation = textAnalysis.makeUserProfile(firstname, surname)
    return render_template("profile.html", profile=evaluation)

@app.route("/api/getComplaints")
def getComplaints():
    complaintList = ComplaintList()
    return jsonify(complaintList.complaintDict)

@app.route("/api/getUserComplaints")
def getUserComplaints():
    username = request.json['username']
    complaintList = ComplaintList()
    usersComplaints = []
    for key in complaintList.complaintDict.keys():
        if(complaintList.complaintDict[key][1] == username):
            usersComplaints.append(complaintList.complaintDict[key][0])
    return jsonify(usersComplaints)

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

@app.route("/api/getChatResponse", methods=['POST'])
def getChatResponse():
    message = request.json['message']
    message = message.upper()
    if("CAPTCHA" in message):
        return "Git good at long boi"
    elif("BROKEN" in message):
        return "This website is perfect the way it is"
    elif("WHY" in message):
        return "I do not know why anything, I am but a humble bot"
    elif("NOT WORKING" in message):
        return "Have you tried burning it to the ground and rebuilding from scratch"
    elif("WHAT IS" in message):
        return "Use the internet, dumbass"
    elif("HOW" in message):
        return "Do not question the workings of the universe"
    else:
        return "I have no fucking clue what you're on about"


if __name__ == "__main__":
    app.run(host='0.0.0.0')