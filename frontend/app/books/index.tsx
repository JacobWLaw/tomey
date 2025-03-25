import React from 'react';
import { View } from 'react-native';
import BookList from '../../components/BookList';
import BookGrid from '../../components/BookGrid';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <BookGrid />
    </View>
  );
}