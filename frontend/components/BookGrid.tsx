import React from "react";
import { useState } from "react";
import { Book } from "../../types/Book";
import { FlatList, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { useBooks } from "../hooks/useBooks";
import { useThemedStyles } from "../theme/useThemedStyles";

// Get device width to calculate column sizes
const { width } = Dimensions.get("window");
const numColumns = 8; // Number of columns in the grid
const gap = 10; // Gap between items
const itemWidth = (width - (numColumns + 1) * gap) / numColumns; // Calculate item width

export default function BookGrid() {
    const { books, loading, error } = useBooks();

    const styles = useThemedStyles(theme => ({
        container: {
            flex: 1,
            padding: gap,
            backgroundColor: theme.colors.background,
        },
        grid: {
            padding: gap / 2,
        },
        row: {
            justifyContent: 'center',
            marginBottom: gap,
        },
        bookItem: {
            width: itemWidth,
            backgroundColor: theme.colors.background,
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        coverImage: {
            width: '100%',
            height: itemWidth * 1.5, // 3:2 aspect ratio for book covers
            backgroundColor: theme.colors.background,
        },
        title: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: '600',
            marginTop: 8,
            marginHorizontal: 8,
        },
        author: {
            fontSize: 12,
            color: theme.colors.text,
            marginTop: 4,
            marginBottom: 8,
            marginHorizontal: 8,
        },
        message: {
            fontSize: 16,
            textAlign: 'center',
            padding: 20,
            color: theme.colors.text,
        }
    }));
    
    // Book item renderer
    const renderBookItem = ({ item }: { item: Book }) => (
        <TouchableOpacity 
            style={styles.bookItem}
            onPress={() => console.log(`Book selected: ${item.title}`)}
        >
            <Image 
                source={{ uri: item.coverImage || 'https://via.placeholder.com/150x200?text=No+Cover' }} 
                style={styles.coverImage}
                resizeMode="cover"
            />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
        </TouchableOpacity>
    );

    if (loading) return <Text style={styles.message}>Loading books...</Text>;
    if (error) return <Text style={styles.message}>Error: {error}</Text>;
    if (!books || books.length === 0) return <Text style={styles.message}>No books available</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderBookItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={styles.row} // Style for each row in the grid
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

