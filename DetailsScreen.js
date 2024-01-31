import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, StyleSheet, Linking, ScrollView, FlatList, SafeAreaView, Dimensions } from 'react-native';
import useFavorites from './useFavorites';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const [director, setDirector] = useState('');
  const [trailerKey, setTrailerKey] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en`;
  const urlcredit = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en-US`;
  const urlvideos = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en-US`;

  const fetchData = (url) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error(error));
  };

  const fetchDirector = (urlcredit) => {
    fetch(urlcredit)
      .then((resp) => resp.json())
      .then((json) => {
        const directorInfo = json.crew.find((crew) => crew.job === 'Director');
        setDirector(directorInfo ? directorInfo.name : 'Unknown Director');
      })
      .catch((error) => console.error(error));
  };

  const fetchTrailer = (urlvideos) => {
    fetch(urlvideos)
      .then((resp) => resp.json())
      .then((json) => {
        const firstTrailer = json.results.find((video) => video.type === 'Trailer');
        setTrailerKey(firstTrailer ? firstTrailer.key : '');
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData(url);
    fetchDirector(urlcredit);
    fetchTrailer(urlvideos);
  }, [url, urlcredit, urlvideos]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} style={styles.Backdrop} />
      <View style={styles.LinearGradient}>
        <LinearGradient colors={['transparent','transparent', 'rgb(24 28 33)']} style={styles.LinearGradient} />
      </View>
      <View style={styles.TopCard}>
        <View style={styles.TitleCard}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.originaltitle}>{movie.original_title}</Text>
          <Text style={styles.date}>
            {movie.release_date && movie.release_date.split("-")[0]} · DIRECTED BY
          </Text>
          <Text style={styles.director}>{director}</Text>
          <View style={styles.TrailerRuntime}>
          {trailerKey && (
            <Pressable
              onPress={() => {
                Linking.openURL(`https://www.youtube.com/watch?v=${trailerKey}`);
              }}
              style={styles.trailerButton}
            >
            <AntDesign name="caretright" size={15} color="#fff" />
              <Text style={styles.trailerButtonText}>TRAILER</Text>
            </Pressable>
          )}
          <Text style={styles.runtime}>{movie.runtime}mins</Text>
          </View>
        </View>
        <View style={styles.Image}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.movieImage}
          />
        </View>
      </View>
      <View style={styles.Text}>
      <Text style={styles.tagline}>{movie.tagline}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Pressable
        style={styles.favoriteButton}
        onPress={() => (isFavorite(movieId) ? removeFavorite(movieId) : addFavorite(movieId))}
      >
        <Text style={styles.buttonText}>
          {isFavorite(movieId) ? 'Remove from watchlist' : 'Add to watchlist'}
        </Text>
      </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'rgb(24 28 33)',  
    width: width,
  },
  Backdrop: {
    width: width, 
    height: 300,
    marginBottom: 20,
    top: 0,
    zIndex: -1,
    position: 'absolute',

  },
  LinearGradient : {  
    width: width, 
    height: 300,
    marginBottom: 20,
    top: 0,
    zIndex: -1,
    position: 'absolute',
  },
  TopCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '75%',
    padding: 10,


  },
  Text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  TitleCard: {
    display: 'flex',
    flexDirection: 'column',
    width: 170,
  },
  movieImage: {
    width: 130,
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(254 254 253)',
  },
  originaltitle: {
    fontSize: 16,
    marginBottom: 10,
    color: 'rgb(145 162 178)',
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
    color: 'rgb(145 162 178)',
  },
  director: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'rgb(254 254 253)',
  },
  runtime: {
    fontSize: 16,
    color: 'rgb(145 162 178)',
  },
  TrailerRuntime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trailerButton: {
    backgroundColor: 'rgb(145 162 178)', // Customize the color
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trailerButtonText: {
    color: '#fff', // Customize the text color
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: 'rgb(145 162 178)',
    textTransform: 'uppercase',
    textAlign: 'justify',
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'rgb(145 162 178)',
    textAlign: 'justify',
    lineHeight: 24,
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
