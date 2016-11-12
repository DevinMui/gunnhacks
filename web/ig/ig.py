#T o install pip install python-instagram

from instagram.client import InstagramAPI
client_id = '837cc2720af049858962aee32cf48a93'
client_secret = '83eded60cf1643f1a307fd05dceac6a3'
access_token = '3256131004.837cc27.9a492f4c5dbe4fb6a242de6fce347e26'

api = InstagramAPI(access_token = access_token, client_secret=client_secret)
#usr = api.user_search('katyperry')
user_info = api.user_search('devinmui')
print (user_info)
#print (usr)

#api = InstagramAPI(client_id=client_id, client_secret=client_secret)
#popular_media = api.media_popular(count=20)
#for media in popular_media:
#    print (media.images['standard_resolution'].url)
