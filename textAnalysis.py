from textblob import TextBlob
from nltk.corpus import wordnet as wn, wordnet

def makePositive(originalComplaint):
    global wordCount
    global adjectiveWordCount
    global nounWordCount
    global wordChanges      # technically bad words detected

    adjectiveWordCount = 0
    nounWordCount = 0
    wordChanges=0

    textBlob = TextBlob(originalComplaint)
    wordCount = len(textBlob.words);
    acceptedTags = ["JJ", "JJR", "JJS", "VBP", "VB", "VBD", "VBN", "VBG", "VBZ"]
    adjTags = ["JJ", "JJR", "JJS"]
    verbTags = ["VBP", "VB", "VBD", "VBN", "VBG", "VBZ"]


    for index in range(0, len(textBlob.tags)):
        word = textBlob.words[index]

        if(textBlob.tags[index][1] in adjTags):
            adjectiveWordCount += 1

        if(textBlob.tags[index][1] in verbTags):
            nounWordCount += 1

        if(textBlob.tags[index][1] in acceptedTags):
            wordBlob = TextBlob(textBlob.words[index])
            sentiment = wordBlob.sentiment[0]
            if(wordBlob.sentiment[0] < 0):
                wordChanges += 1
                textBlob = textBlob.replace(textBlob.tags[index][0], getAntonym(textBlob.tags[index][0]))
    return str(textBlob)

def getAntonym(word):
    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            if l.antonyms():
                return l.antonyms()[0].name()
    return word

def correctSpelling(originalComplaint):
    textBlob = TextBlob(originalComplaint)

def makeUserProfile(firstname, surname):
    # return dictionary of user profiling summary
    profile = {"Moany Bitch":"Moans way too much, could do with changing that"}
    
    if (len(firstname) > 7 ):
        profile['pretentious'] = "With a name like that.... You've got to be pretentious. "

    surnameFile = open('oldEnglishSurnames.txt', 'r')
    oldEngSurnames = []
    for line in surnameFile:
        oldEngSurnames.append(line.replace("\r\n", ""));
    
    for name in oldEngSurnames:
        if (surname == name):
            profile['Fancy Pants'] = "'Ooooh look at me with an old English surname, I must be fancy.' ";

    if (adjectiveWordCount > 1):
        profile['Smart Aleck'] = "You heard. "

    if (nounWordCount > 1):
        profile['Introvert'] = "Yeah you should probably get out more... Stop writing complaints whilst you're at it. "

    if (wordCount > 30):
        profile['Bitter'] = "Jeeeez, someone got out of the wrong side of the bed this morning. "
    elif (wordCount > 10):
        profile['Bitter'] = "Awwww is someone feeling a bit bitter... Maybe you should stop complaining all the time. "

    if (wordChanges > 5):
        profile['Pessimist'] = "This is a different level of pessimism now. At this point you're probably beyond help. "
        profile['Compulsive Liar'] = "We detected a huge number of lies in your complaint, you should probably see a therapist about this habbit. "
    elif (wordChanges > 0):
        profile['Pessimist'] = "You're a pessimist. You gotta lighten up, think more about the good things. "
        profile['Liar'] = "We detected lies in your complaint, you should of probably grown out of that by now. "
    
    return profile  #Need to change format of return