import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '../theme/useThemedStyles';

export default function Home() {

  const styles = useThemedStyles(theme => ({
    heading: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 16,
      textAlign: 'center',
    }
  }));

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>Welcome to Tomey!</Text>
    </View>
  );

}

