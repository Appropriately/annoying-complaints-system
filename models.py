import random
import json

class QueueList:
    def __init__(self):
        try:
            file = open("queue.json", "r")
            self.queueDict = json.load(file)
            file.close()
        except:
            self.queueDict = {}
        self.peopleInQueue = len(self.queueDict)

    def addToQueue(self, queueID):
        self.queueDict[queueID] = self.peopleInQueue
        self.peopleInQueue = self.peopleInQueue + 1
        file = open("queue.json", "w+")
        json.dump(self.queueDict, file)
        file.close()

    def removeFromQueue(self, queueID):
        if(queueID in self.queueDict.keys()):
            del self.queueDict[queueID]
            self.peopleInQueue = self.peopleInQueue - 1
            for key in self.queueDict.keys():
                self.queueDict[key] = self.queueDict[key] - 1
            file = open("queue.json", "w+")
            json.dump(self.queueDict, file)
            file.close()

    def getQueuePosition(self, queueID):
        print(str(self.queueDict))
        if(queueID in self.queueDict.keys()):
            return self.queueDict[queueID]
        return -1

class UserList:

    def __init__(self):
        try:
            file = open("users.json", "r")
            self.userList = json.load(file)
            file.close()
        except:
            self.userList = {}

    def authenticateUser(self, username, password):
        for key in self.userList.keys():
            if(self.userList[key]['username'] == username):
                if(self.userList[key]['password'] == password):
                    return True
        return False

    def addUser(self, user):
        self.userList[user.userID] = user.__dict__
        file = open("users.json", "w+")
        json.dump(self.userList, file)
        file.close()

class User:

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
        self.userID = random.randint(10000000, 99999999)