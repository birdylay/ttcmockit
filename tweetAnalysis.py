import random

# stations on the Bloor-Danforth Line 2
station = ["Kipling", "Islington", "Royal York", "Old Mill", "Jane", "Runnymede", 
	"High Park", "Keele", "Dundas West", "Landsdowne", "Dufferin", "Ossington", 
	"Christie", "Bathurst", "Spadina", "St. George", "Bay", "Bloor-Yonge", 
	"Sherbourne", "Castle Frank", "Broadview", "Chester", "Pape", "Donlands", 
	"Greenwood", "Coxwell", "Woodbine", "Main Street", "Victoria Park", "Warden", 
	"Kennedy"]

# dictionary of instantiated stations
stationObjects = {}

direction = ["east", "west"]

# class to instantiate new subway cars
# ID: integer - to identify subway car, mostly for debugging purposes
# stationName: string - station the car is currently at
# delayed: boolean - True (it is delayed) False (not delayed)
# direction: string - east or west
class subwayCar:
	def __init__(self, ID, stationName, delayed, direction):
		self.ID = ID
		self.name = stationName
		self.delayed = delayed
		self.direction = direction
		self.timer = 0

	def getStation(self):
		return self.name

	def getDelayed(self):
		return self.delayed

	def getDirection(self):
		return self.direction

# each station has its own state
# stationName: string - name of station
# occupiedEast/West: boolean - True (currently a subway car present) False (no car)
# numberOfTrains: integer - number of trains at a station, max 2, important for terminal stations
class subwayStation:
	def __init__(self, stationName, occupiedEast, occupiedWest, numberOfTrains):
		self.name = stationName
		self.occupiedEast = occupiedEast
		self.occupiedWest = occupiedWest
		self.numberOfTrains = numberOfTrains

	def getName(self):
		return self.name

	def getOccupiedEast(self):
		return self.occupiedEast

	def getOccupiedWest(self):
		return self.occupiedWest

	def getNumberOfTrains(self):
		return self.numberOfTrains

# instantiating stations into dictionary, key: name value:object pair
for name in station:
	stationObjects[name] = subwayStation(name, False, False, 0)

# start up two subway cars at Kipling and Kennedy
car1 = subwayCar(1, "Kipling", False, "east")
stationObjects["Kipling"].occupiedEast = True
stationObjects["Kipling"].numberOfTrains = 1

car2 = subwayCar(2, "Kennedy", False, "west")
stationObjects["Kennedy"].occupiedWest = True
stationObjects["Kennedy"].numberOfTrains = 1

'''
car3 = subwayCar(3, "Bay", False, "east")
stationObjects["Bay"].occupiedEast = True
stationObjects["Bay"].numberOfTrains = 1

car4 = subwayCar("Bay", False, "west")
stationObjects["Bay"].occupiedWest = True
stationObjects["Bay"].numberOfTrains = 2
'''
subwayCars = [car1, car2]
#subwayCars = [car1, car2, car3, car4]

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
for index in range(1000):
	randomTweet = random.choice(individualTweets) # choose a random tweet
	randomDirection = random.choice(direction) #choose which way subway car is delayed or cleared

	# increase the timer for every car by 1 each loop, change to next station upon reach 5 (simulates 5 minute wait time)
	# invariant: 2 cars cannot be at same station with same direction
	for car in subwayCars:
		if car.delayed == False:
			car.timer = car.timer + 1
		if car.timer == 5:
			if car.direction == "east": 
				nextStation = station[station.index(car.name)+1] 
				# determine next station, ensure that it is not occupied, then reset timer and move train to next station.  Set occupied and number of trains attributes of the next station object and the previous station objects (train left station so station is not occupied and number of trains at station decreased by 1).  
				if stationObjects[nextStation].occupiedEast == False:
					car.timer = 0
					stationObjects[car.name].occupiedEast = False
					stationObjects[car.name].numberOfTrains -= 1
					car.name = nextStation
					stationObjects[nextStation].occupiedEast = True
					stationObjects[nextStation].numberOfTrains += 1
					print "CarID: " + str(car.ID) + " arriving at " + car.name + " | " + car.direction + "bound"
			else:
				# same logic applied to westbound trains
				nextStation = station[station.index(car.name)-1]
				if stationObjects[nextStation].occupiedWest == False:
					car.timer = 0
					stationObjects[car.name].occupiedWest = False
					stationObjects[car.name].numberOfTrains -= 1
					car.name = nextStation
					stationObjects[nextStation].occupiedWest = True
					stationObjects[nextStation].numberOfTrains += 1
					print "CarID: " + str(car.ID) + " arriving at " + car.name + " | " + car.direction + "bound"
			# terminal stations, change direction of arriving cars, ensure westbound and eastbound attributes of stations are set as occupied. eg. if arriving into Kipling westbound, change direction to east, check number of trains at the station, if only that one train then set westbound side to be free to make room for 1 more train.
			if car.name == "Kipling":
				car.direction = "east"
				stationObjects[car.name].occupiedEast = True
				if stationObjects[car.name].numberOfTrains == 1:
					stationObjects[car.name].occupiedWest = False
			elif car.name == "Kennedy":
				car.direction = "west"
				stationObjects[car.name].occupiedWest = True
				if stationObjects[car.name].numberOfTrains == 1:
					stationObjects[car.name].occupiedEast = False
	# determine if cars are delayed or cleared
	if isDelayed(randomTweet):
		for car in subwayCars:
			if car.delayed == False and car.name == whichStation(randomTweet) and car.direction == randomDirection:
				car.delayed = True
				#setDelays(whichStation(randomTweet), randomDirection)
				print car.name + " is delayed " + car.direction 
			
	else:
		for car in subwayCars:
			if car.delayed == True and car.name == whichStation(randomTweet) and car.direction == randomDirection:
				car.delayed = False
				#setClears(whichStation(randomTweet), randomDirection)
				print car.name + " is all clear " + car.direction