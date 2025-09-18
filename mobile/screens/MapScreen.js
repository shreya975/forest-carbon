import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);

  useEffect(()=> {
    axios.get('http://YOUR_PC_IP:5000/api/projects')
      .then(r => setMarkers(r.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <MapView
      style={{flex:1}}
      initialRegion={{
        latitude: 20,
        longitude: 78,
        latitudeDelta: 10,
        longitudeDelta: 10
      }}
    >
      {markers.map(m => (
        <Marker
          key={m._id}
          coordinate={{latitude: m.coords.lat, longitude: m.coords.lon}}
        />
      ))}
    </MapView>
  );
}