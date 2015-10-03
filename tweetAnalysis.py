import random
import pdb

# stations on the Bloor-Danforth Line 2
station = ["Kipling", "Islington", "Royal York", "Old Mill", "Jane", "Runnymede", 
	"High Park", "Keele", "Dundas West", "Landsdowne", "Dufferin", "Ossington", 
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
		self.timer = 0

# start up two subway cars at Kipling and Kennedy
car1 = subwayCar("Kipling", False, "east")
car2 = subwayCar("Kennedy", False, "west")
car3 = subwayCar("Bay", False, "east")
car4 = subwayCar("Bay", False, "west")
subwayCars = [car1, car2, car3, car4]

# determine if tweet refers to a delay or all clear
def isDelayed(tweet):
	tweetLowerCase = tweet.lower()
	if "all clear" in tweetLowerCase:
		delayed = False
	elif "suspended" or "delayed":
		delayed = True
	return delayed

# which station is being referred to in the tweet
def whichStation(tweet):
	for stationName in station:
		if stationName in tweet:
			currentStation = stationName
			return currentStation
		else: 
			currentStation = "No station mentioned"

# set all other cars delayed behind delayed station
# need to implement case where car behind was already delayed
def setDelays(stationName, eastWest):
	for car in subwayCars:
		if eastWest == "east":
			if station.index(car.name) < station.index(stationName):
				car.delayed = True
		elif eastWest == "west":
			if station.index(car.name) > station.index(stationName):
				car.delayed = True

# set all other cars clear behind cleared station
# need to implement case where car behind may be delayed from other reasons
def setClears(stationName, eastWest):
	for car in subwayCars:
		if eastWest == "east":
			if station.index(car.name) < station.index(stationName):
				car.delayed = False
		elif eastWest == "west":
			if station.index(car.name) > station.index(stationName):
				car.delayed = False

pullTweets = open('tweets.txt', 'r').read() # read in dummy tweets from TTCNotices
individualTweets = pullTweets.split('\n') # split tweets in file by newline

# simulate based on number of tweets in dummy file
for index in range(10000):
	randomTweet = random.choice(individualTweets) # choose a random tweet
	randomDirection = random.choice(direction) #choose which way subway car is delayed or cleared

	# increase the timer for every car by 1 each loop, change to next station upon reach 5 (simulates 5 minute wait time)
	# invariant: 2 cars cannot be at same station with same direction
	for car in subwayCars:
		if car.delayed == False:
			car.timer = car.timer + 1
		if car.timer == 5:
			print car.name + " " + car.direction
			car.timer = 0
			if car.direction == "east":
				car.name = station[station.index(car.name)+1]
			else:
				car.name = station[station.index(car.name)-1]
			if car.name == "Kipling":
				car.direction = "east"
			elif car.name == "Kennedy":
				car.direction = "west"

	if isDelayed(randomTweet):
		for car in subwayCars:
			if car.delayed == False and car.name == whichStation(randomTweet) and car.direction == randomDirection:
				car.delayed = True
				setDelays(whichStation(randomTweet), randomDirection)
				print car.name + " is delayed"
			
	else:
		for car in subwayCars:
			if car.delayed == True and car.name == whichStation(randomTweet) and car.direction == randomDirection:
				car.delayed = False
				setClears(whichStation(randomTweet), randomDirection)
				print car.name + " is all clear"