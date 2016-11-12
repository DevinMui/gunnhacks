import twitter
from pymongo import MongoClient
import time
client = MongoClient()

db = client.gunn

api = twitter.Api(consumer_key='dRlAYU0fDOPpAWSGFz3DqTkLx',
				  consumer_secret='PDTKVEwwrFlMS32u9kEaVie7LAFxoNwR17e2uPQCX7Tyk8lvRI',
				  access_token_key='2840635218-0AVHHUVcIvRePwSCRfcRhsPLlpa7ndbIsWUTKEM',
				  access_token_secret='aSLZPfWqVNdFhmbrTtGBNdXUBCYFgArMjZ012yUppcKIS')

# for follow in db.follows.find():
statuses = api.GetUserTimeline(screen_name="devinwmui")
# print statuses[1]
for post in statuses:
	print post.place
