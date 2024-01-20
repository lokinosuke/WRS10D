import React, { useState } from 'react';
import { SafeAreaView, FlatList, Pressable, Image, Text, TextInput, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo vector icons
import useFavorites from './useFavorites';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 4;
const spacing = 8;

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { favorites } = useFavorites();
  const url = `https://api.themoviedb.org/3/search/movie?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en&query=${searchQuery}`;

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // Empty search query, handle as needed
      return;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setSearchResults(json.results))
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => navigation.navigate('Details', { movieId: item.id })}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{ width: itemWidth - spacing, height: itemWidth * 1.5 - spacing }}
              />
            </Pressable>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text>No results found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  item: {
    marginRight: spacing,
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
