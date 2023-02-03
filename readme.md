# Dependencies

* Python 3.6
* TensorFlow 2.1
* Android Studio

# Outputs


![Output](https://raw.githubusercontent.com/generic-matrix/glasses-detection/main/Output/output.gif)


# Project Structure

The project has 4 folders

* Android App -> The Android App code
* Model -> It has the trained model 
* Training -> It has Training.ipynb which can be opened in Google Colab
* Output

# Run the backend service
* cd backend
* pip3 install -r requirements.txt
* python3 index.py

# How to build the Android App

* ```git clone https://github.com/generic-matrix/glasses-detection.git```
* cd react-native-app
* Run The back end service
* npm install
* In the App.js change the url with  the corrosponding backend url
* react-native run-android


# How To build iOS App

* ```git clone https://github.com/generic-matrix/glasses-detection.git```
* cd react-native-app
* Run The back end service
* npm install
* In the App.js change the url with  the corrosponding backend url
* react-native run-ios



