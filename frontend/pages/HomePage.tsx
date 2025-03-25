import React from 'react';
import { View, Text } from 'react-native';
import BookList from '../components/BookList';

export default function HomePage() {
  return (
    <View style={{ flex: 1 }}>
      <BookList />
    </View>
  );
}