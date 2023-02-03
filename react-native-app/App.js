import React,{useState} from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity,ToastAndroid,Image,ActivityIndicator} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FormData from 'form-data'
import axios from 'axios';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 10,
    textAlign:'center'
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});



export default function App() {
  
  const [label, setLabel] = useState("");
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(false);


  async function SelectPhoto(){

    const options = {
      mediaType:'photo'
    }
    const result = await launchImageLibrary(options)
    if(result.assets===undefined){
      // Some error log it as toast , you an parse the error to be more specific . Refer the docs
      ToastAndroid.showWithGravity(
        'Could not pick an image',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }else{
      setDirectory({ uri: result.assets[0].uri });
      let formData = new FormData();

      formData.append('image', { uri: result.assets[0].uri, name: result.assets[0].fileName, type: result.assets[0].type });
      setLoading(true);
      await axios.post('http://192.168.43.245:5001/detect-glasses', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => {
           setLabel(res.data.result);
           setLoading(false);
        }).catch(err => {
          ToastAndroid.showWithGravity(
            'Error to get the response from the server',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setLoading(false);
      });
    }
    
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Glasses Detection</Text>
      {
        (loading===true)? <ActivityIndicator size="large" />:<></>
      }
      {
        (directory===null)? <></>:<Image source={directory} style={styles.image}/>
      }
      <Text style={styles.subtitle}>{label}</Text>
      <Text style={styles.subtitle}>Make Sure you select the images which are cropped to the face</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={SelectPhoto}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
