import random
from flask import Flask, send_file, session, request
from models import User, UserList, QueueList

app = Flask(__name__)


@app.route("/")
def index():
    return send_file("/templates/index.html")

app.route("/api/registerUser", methods=['POST'])
def registerUser():
    newUser = User(request.form['username'], request.form['password'], request.form['email'])
    userList = UserList()
    userList.addUser(newUser)
    return "User added"

app.route("/api/authenticateUser", methods=['POST'])
def authenticateUser():
    userList = UserList()
    username = request.form['username']
    password = request.form['password']
    return userList.authenticateUser(username, password)

@app.route("/api/postComplaint")
def postComplaint():
    return "Complaint"

@app.route("/api/addToQueue", methods=['POST'])
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

@app.route("api/leaveQueue")
def leaveQueue():
    session.pop('QueueID', None)
    return "Left Queue"

if __name__ == "__main__":
    app.run(host='0.0.0.0')