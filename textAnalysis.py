from textblob import TextBlob
from nltk.corpus import wordnet as wn, wordnet


def makePositive(originalComplaint):
    textBlob = TextBlob(originalComplaint)
    acceptedTags = ["JJ", "JJR", "JJS", "VBP", "VB", "VBD", "VBN", "VBG", "VBZ"]
    for index in range(0, len(textBlob.tags)):
        word = textBlob.words[index]
        if(textBlob.tags[index][1] in acceptedTags):
            wordBlob = TextBlob(textBlob.words[index])
            sentiment = wordBlob.sentiment[0]
            if(wordBlob.sentiment[0] < 0):
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