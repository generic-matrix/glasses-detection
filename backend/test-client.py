import requests

url = 'http://127.0.0.1:5000/detect-glasses'
my_img = {'image': open('/Users/userx/Downloads/00125.jpg', 'rb')}
r = requests.post(url, files=my_img)
print(r.json())