import React from "react";
import { useState } from "react";
import { Book } from "../../types/Book";
import { FlatList, Text, View, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useBooks } from "../hooks/useBooks";
import { useThemedStyles } from "../theme/useThemedStyles";

const numColumns = 5; // Number of columns in the grid
const gap = 10; // Gap between items
const staticItemWidth = 125
const minGridWidth = numColumns * staticItemWidth + (numColumns - 1) * gap + 2 * gap;


export default function BookGrid() {
    const { books, loading, error } = useBooks();
    const {width}  = useWindowDimensions();

    const styles = useThemedStyles(theme => ({
        container: {
            flex: 1,
            padding: gap,
            minWidth: minGridWidth,
            overflow: 'hidden',
            backgroundColor: theme.colors.background,
        },
        grid: {
            padding: gap,
            minWidth: minGridWidth,
        },
        row: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start', 
            marginBottom: 0,
        },
        bookItem: {
            width: staticItemWidth,
            backgroundColor: theme.colors.background,
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            margin: gap
        },
        coverImage: {
            width: '100%',
            height: staticItemWidth * 1.5,
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
    
    const renderBookItem = ({ item }: { item: Book }) => (
        <TouchableOpacity 
            style={styles.bookItem}
            onPress={() => console.log(`Book selected: ${item.title}`)}
        >
            <Image 
                source={{ uri: item.coverImage || 'https://mdngpopbogrhbrqwrsbq.supabase.co/storage/v1/object/sign/tomey/CoverNotAvailable%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0b21leS9Db3Zlck5vdEF2YWlsYWJsZSAoMSkuanBnIiwiaWF0IjoxNzQzMDE3NTIyLCJleHAiOjQ4NjUwODE1MjJ9.DezQbiXLI5nt8nkphFPZaV8wId09HQusXdXfAStwmwo' }} 
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
                columnWrapperStyle={styles.row} 
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

