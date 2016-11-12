import requests

client_id = '837cc2720af049858962aee32cf48a93'
access_token = '3256131004.837cc27.9a492f4c5dbe4fb6a242de6fce347e26'


r = requests.get('https://api.instagram.com/v1/users/3256131004/media/recent/', params={access_token: access_token})

print(r)
