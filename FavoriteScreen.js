import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import useFavorites from './useFavorites';
import { useIsFocused } from '@react-navigation/native';

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

console.log(favoriteMovies);

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
        ListEmptyComponent={() => <Text style={styles.emptyText}>No favorites yet!</Text>}
        horizontal={true} // Set this to true for horizontal display
        showsHorizontalScrollIndicator={false} // Optional: to hide the horizontal scroll indicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF', // Change background color if needed
    padding: 20,
  },
  movieContainer: {
    marginRight: 20, // Adjust as needed for spacing between movies
    alignItems: 'center',
  },
  movieImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
});

export default FavoriteScreen;
