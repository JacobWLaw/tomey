import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useBooks } from '../hooks/useBooks';
import { Book } from '../../types/Book';
import { useThemedStyles } from '../theme/useThemedStyles';
import { useTheme } from '../theme/ThemeContext';

export default function BookList() {
  const { books, loading, error } = useBooks();
  const { theme } = useTheme();
  
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: theme.fontSize.xlarge,
      fontWeight: 'bold',
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
    listContent: {
      paddingBottom: theme.spacing.xl,
    },
    bookItem: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    bookTitle: {
      fontSize: theme.fontSize.large,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.medium,
    },
  }));

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text }}>Loading books...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Books</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}