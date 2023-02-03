import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify

'''
You can easily deploy index.py in the GCP cloud function : https://cloud.google.com/functions/docs/writing/write-http-functions#http-example-python
The requests in the request.files line is a flask request object . Refer the above docs
'''
app = Flask(__name__)


IMAGE_SIZE = 224
IMAGE_DIR = "/tmp/temp.jpg" 

reconstructed_model = tf.keras.models.load_model('../model/')

def GetResultForImage(image_location):
  img = cv2.imread(image_location, cv2.COLOR_RGBA2BGR)
  resized = cv2.resize(img,(IMAGE_SIZE,IMAGE_SIZE),3)
  result = np.expand_dims(resized, axis=0)
  result=reconstructed_model.predict(result)
  return "with glasses " if result[0]<0 else "without glases"


@app.route("/detect-glasses", methods=["POST"])
def process_image():
  file = request.files.get('image', default=None)
  if file is None:
    return jsonify({'result' : 'null', 'error': 'malformed request'}),400
  file.save(IMAGE_DIR)
  return jsonify({'result' : GetResultForImage(IMAGE_DIR), 'error':'null'})

@app.route("/status", methods=["GET"])
def status():
  return "okay"

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001,debug=True)