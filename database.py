'''
database.py
Module to act as a connector to database to store tweets.  Creation of database and table is automated; however, server, user, and password required.
'''

import MySQLdb
import sys

'''
mysql instructions:
mysql.server start
mysql -u root -p
CREATE DATABASE dbname;
USE dbname;
CREATE TABLE tables (Username VARCHAR(20), Tweet VARCHAR(140), Time INT(13), NDP INT(13), Conservative INT(13), Liberal INT(13)); 
'''

# connect to database (server, MySQL username, MySQL pass, Database name)
try:
	conn = MySQLdb.connect("localhost","root","cookies")
except Exception as e:
	sys.ext('We cant get into the database')

# cursor used to execute queries
c = conn.cursor()

# create and use database
c.execute("CREATE DATABASE IF NOT EXISTS root$ttc")
conn.commit()
c.execute("USE root$ttc")
conn.commit()

#Need function here to delete tables
#delete table if exists
c.execute("DROP TABLE IF EXISTS tweets")
c.execute("DROP TABLE IF EXISTS subwayCars")
c.execute("DROP TABLE IF EXISTS stations")
conn.commit()
# create table to store tweets
c.execute("CREATE TABLE IF NOT EXISTS tweets (tweet VARCHAR(140), time TIME)")
c.execute("CREATE TABLE IF NOT EXISTS subwayCars (id INT(13), name VARCHAR(140), delay VARCHAR(140), direction VARCHAR(140), timer INT(13))")
c.execute("CREATE TABLE IF NOT EXISTS stations (name VARCHAR(140), occupiedEast VARCHAR(140), occupiedWest VARCHAR(140), numberOfTrains INT(13))")
conn.commit()

# insert a row into table
def insertTweet(tweet, time):
	# execute specified query: 
	c.execute("INSERT INTO tweets (tweet, time) VALUES (%s,%s)",
            (tweet, time))

    # commit changes to database
	conn.commit()
	return True

def insertCar(carId, name, delay, direction, timer):
	# execute specified query: 
	c.execute("INSERT INTO subwayCars (id, name, delay, direction, timer) VALUES (%s,%s,%s,%s,%s)",
            (carId, name, delay, direction, timer))

    # commit changes to database
	conn.commit()
	return True

def insertStation(name, occupiedEast, occupiedWest, numberOfTrains):
	# execute specified query: 
	c.execute("INSERT INTO stations (name, occupiedEast, occupiedWest, numberOfTrains) VALUES (%s,%s,%s,%s)",
            (name, occupiedEast, occupiedWest, numberOfTrains))

    # commit changes to database
	conn.commit()
	return True

def updateCar(carId, name, delay, direction, timer):
	c.execute("UPDATE subwayCars SET name=%s, delay=%s, direction=%s, timer=%s WHERE id=%s",
		(name, delay, direction, timer, carId))

    # commit changes to database
	conn.commit()
	return True

def updateStation(name, occupiedEast, occupiedWest, numberOfTrains):
	c.execute("UPDATE stations SET occupiedEast=%s, occupiedWest=%s, numberOfTrains=%s WHERE name=%s",
		(occupiedEast, occupiedWest, numberOfTrains, name))

    # commit changes to database
	conn.commit()
	return True

'''
# produces sum of specified party: ndp, conservative, liberal
def getSum(party):
	stmt = "SELECT SUM({0}) FROM tweetTable".format(party) #assumes column name is trusted input
	c.execute(stmt)
	#c.execute("SELECT SUM(%(party)s) FROM tables", [party])
	result = c.fetchone() #gets the row of the produced sum table
	#return value within the cell
	print result[0]
	return result[0]

#determine percentage of tweets relevent to specific party: ndp, conservative, liberal
def getPercent(party):
	c.execute("SELECT COUNT(*) FROM tweetTable")
	result = c.fetchone() #gets the row of the produced sum table
	percent = getSum(party)/result[0] * 100
	#return percentage
	print "{}{}".format(percent, "%")
	return percent
'''