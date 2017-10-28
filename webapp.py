from flask import Flask, send_file

app = Flask(__name__)


@app.route("/")
def index():
    return send_file("templates/index.html")

@app.route("/api/postComplaint")
def postComplaint():
    return "Complaint"

@app.route("/api/addToQueue", methods=['POST'])
def addToQueue():
    return "Added to the Queue"

@app.route("/api/getQueuePosition")
def getQueuePosition():
    return 0

if __name__ == "__main__":
    app.run(host='0.0.0.0')