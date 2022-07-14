import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native";



export default function App() {
  const [loading, setLoading] = useState(true); 
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  
  function loadBusStopData() {
    fetch(BUSSTOP_URL)
    .then((response) => response.json())
    .then((json) => {
      const myBus = json.services.filter((bus) => bus.no ==155)[0];
    console.log(myBus);
    });
  }
  
  useEffect(() => {
    loadBusStopData();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time: </Text>
      
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={"grey"}/>: "Loaded"}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText}>Refresh!</Text>
        </TouchableOpacity>      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 40,
    marginVertical: 20,
  },

  button: {
    backgroundColor: "teal",
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },


});
