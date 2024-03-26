import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png'}}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set background color if needed
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
});

export default Splash;