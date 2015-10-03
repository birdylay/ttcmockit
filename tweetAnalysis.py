import random

# stations on the Bloor-Danforth Line 2
station = ["Kipling", "Islington", "Royal York", "Old Mill", "Jane", "Runnymede", 
	"High Park", "Keele", "Dundas West", "Landsdown", "Dufferin", "Ossington", 
	"Christie", "Bathurst", "Spadina", "Bay", "Bloor-Yonge", "Sherbourne", 
	"Castle Frank", "Broadview", "Chester", "Pape", "Donlands", "Greenwood", 
	"Coxwell", "Woodbine", "Main Street", "Victoria Park", "Warden", "Kennedy"]

direction = ["east", "west"]

# class to instantiate new subway cars
class subwayCar:
	def __init__(self, stationName, delayed, direction):
      self.name = stationName
      self.delayed = delayed
      self.direction = direction

# start up two subway cars at Kipling and Royal York
car1 = subwayCar("Kipling", False, "east")
car2 = subwayCar("Royal York", False, "east")

# determine if tweet refers to a delay or all clear
def isDelayed(tweet):
	tweetLowerCase = tweet.lower()
	if "all clear" in tweetLowerCase:
		delayed = False
	else if "suspended" or "delayed":
		delayed = True
	return delayed

# which station is being referred to in the tweet
def whichStation(tweet):
	for stationName in station:
		if stationName in tweet:
			return stationName
		else return "No station mentioned"

# set all other cars delayed behind delayed station
def setDelays(station):

# set all other cars clear behind cleared station
def setClears(station):


pullTweets = open('tweets.txt', 'r').read() # read in dummy tweets from TTCNotices
individualTweets = pullTweets.split('\n') # split tweets in file by newline

# simulate based on number of tweets in dummy file
for index in range(len(individualTweets)):
	randomTweet = random.choice(individualTweets) # choose a random tweet
	randomDirection = random.choice(direction) #choose which way subway car is delayed or cleared

	if isDelayed(randomTweet):
		if car1.name == whichStation(randomTweet):
			car1.delayed = True
	else:
		if car1.name == whichStation(randomTweet):
			car1.delayed = False