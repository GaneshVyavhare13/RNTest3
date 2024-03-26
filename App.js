import React, { useEffect, useState } from 'react';
import { View ,StyleSheet} from 'react-native';
import Splash from './Splash';
import Login from './Login'; // Your main component/screen

export default function App() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false); // Hide splash screen after 2 seconds
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {splash ? <Splash /> : <Login />}
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
});
