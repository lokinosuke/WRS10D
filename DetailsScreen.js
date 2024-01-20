import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import useFavorites from './useFavorites';

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en`;

  const fetchData = (url) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Pressable
        style={styles.favoriteButton}
        onPress={() => (isFavorite(movieId) ? removeFavorite(movieId) : addFavorite(movieId))}
      >
        <Text style={styles.buttonText}>
          {isFavorite(movieId) ? 'Remove from favorites' : 'Add to favorites'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  movieImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;
