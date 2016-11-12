import requests

gunnhacks = 30
url = "https://watchdogs.mlh.io/chal/1"

data = {
	"nonce": "a914c21188923edb2ecd061239cba8c6c2aeca2820d73750a81a591a65d5f079858c2e323f93c6a40660a465dec4643685a364ff393d8159e8d138d9bc69381e",
	"key": "the_best_hackers_find_all_the_secret_data",
	"event": 0
}

requests.post(url, data=data)