// import React, { useEffect, useState } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { View, StyleSheet } from 'react-native';
// import axios from 'axios';

// type MarkerType = {
//   _id: string;
//   coords: { lat: number; lon: number };
// };

// export default function MapScreen() {
//   const [markers, setMarkers] = useState<MarkerType[]>([]);

//   useEffect(() => {
//     axios
//       .get('http://YOUR_PC_IP:5000/api/projects') 
//       // replace with your PC IP
//       .then((r) => setMarkers(r.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 20,
//           longitude: 78,
//           latitudeDelta: 10,
//           longitudeDelta: 10,
//         }}
//       >
//         {markers.map((m) => (
//           <Marker
//             key={m._id}
//             coordinate={{ latitude: m.coords.lat, longitude: m.coords.lon }}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });