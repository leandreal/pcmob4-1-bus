import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator,
  TextInput,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
//import { format } from "date-fns";//
//import Moment from 'react-moment';//
import moment from 'moment';


export default function App() {
  const [loading, setLoading] = useState(true); 
  const [arrival, setArrival] = useState("");
  const [busstop, setBusStop] = useState("");
  const [busnumber, setBusNumber] = useState("");
  



  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  
  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
    .then((response) => response.json())
    .then((json) => {
      const myBus = json.services.filter((bus) => bus.no == 155)[0];
      console.log(myBus.next.time);
      setArrival(myBus.next.time);
      setLoading(false);
    });
  }
  
  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 5000);
    return ()=> clearInterval(interval);
  }, []);
  
  

  return (
  
    <View style={styles.container}>

   

    <FontAwesome name="bus" size={72} color="navy" />

      <Text style={styles.title}>BUS ARRIVAL SG </Text>

      <Text style={styles.header}>Your Bus Stop:</Text>

      <TextInput
        style={styles.input}
        onChangeText={setBusStop}
        value={busstop}
        placeholder="Enter Bus Stop No. Here"
        keyboardType="numeric"
      />

      <Text style={styles.header}>Your Bus Number:</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={setBusNumber}
        value={busnumber}
        placeholder="Enter Bus No. Here"
        keyboardType="numeric"
        
      />
    
      <Text style={styles.header}>Next Bus Arriving In: </Text>

      <Text style={styles.arrivalTime}>
          
        {loading ? <ActivityIndicator color={"grey"}/>:
        moment(arrival).format('YYYY MMM DD @ HH:MM')}
        </Text>
      
      <Text style={styles.header}>Subseq. Bus Arriving In: </Text>

      <Text style={styles.arrivalTime}>
     
        {loading ? <ActivityIndicator color={"grey"}/>:
        moment(arrival).format('YYYY MMM DD @ HH:MM')}

      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>      
    
    <Text><FontAwesome name="copyright" size={12} color="black"/> Leandreal</Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',

  },

  title: {
    fontSize: 32,
    marginVertical: 10,
    justifyContent:'center',
    fontWeight: '600',
    color: 'navy',
  },

  header: {
    fontSize: 24,
    marginVertical: 20,
    
  },

  button: {
    backgroundColor: "orchid",
    padding: 20,
    marginVertical: 50,
    borderRadius: 10,
    borderWidth: 1,
  },

  buttonText: {
    fontSize: 20,
    
  },

  input: {
    height: 50,
    width: '70%',
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },

  arrivalTime: {
    fontSize: 15,
    fontWeight: '500',
    color: 'blue',
    
  },
});
