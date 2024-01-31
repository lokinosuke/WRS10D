import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Image, Text, StyleSheet, Dimensions } from 'react-native';
import useFavorites from './useFavorites';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 4;
const spacing = 8;

const FavoriteScreen = ({ navigation }) => {
  const { favorites } = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      // Fetch details of each favorite movie using the movie ID
      const movies = await Promise.all(
        favorites.map(async (movieId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en`
          );
          const data = await response.json();
          return data;
        })
      );
      setFavoriteMovies(movies);
    };

    fetchFavoriteMovies();
  }, [favorites, isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.movieContainer}
            onPress={() => navigation.navigate('Details', { movieId: item.id })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.movieImage}
            />
          </Pressable>
        )}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No favorites yet!</Text>}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgb(24 28 33)',
    padding: 20,
  },

  movieImage: {
    width: itemWidth - spacing * 2,
    height: itemWidth * 1.5 - spacing * 2,
    borderRadius: 8,
    padding: 5,
    margin: 5,
    },

});

export default FavoriteScreen;
