import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Pressable, Image, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 4;
const spacing = 8;

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numColumns] = useState(4);
  const [filter, setFilter] = useState('popular');

  const getFilterUrl = (filter) => {
    return `https://api.themoviedb.org/3/movie/${filter}?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en&page=${page}`;
  };

  const fetchData = (url) => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        // Check for duplicate items in the new data
        const uniqueNewData = json.results.filter(newItem => !data.some(item => item.id === newItem.id));
        setData((prevData) => [...prevData, ...uniqueNewData]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const url = getFilterUrl(filter);
    fetchData(url);
  }, [page, filter]);

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleFilter = (newFilter) => {
    setFilter(newFilter);
    setData([]);
    setPage(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'popular' && styles.activeFilter]}
          onPress={() => toggleFilter('popular')}
        >
          <Text style={styles.filterButtonText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'top_rated' && styles.activeFilter]}
          onPress={() => toggleFilter('top_rated')}
        >
          <Text style={styles.filterButtonText}>Top Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'upcoming' && styles.activeFilter]}
          onPress={() => toggleFilter('upcoming')}
        >
          <Text style={styles.filterButtonText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'now_playing' && styles.activeFilter]}
          onPress={() => toggleFilter('now_playing')}
        >
          <Text style={styles.filterButtonText}>Now Playing</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        key={`flatlist-${numColumns}`}
        data={data}
        keyExtractor={(item) => `movie-${item.id.toString()}`}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => navigation.navigate('Details', { movieId: item.id })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
          </Pressable>
        )}
        ListEmptyComponent={() => <Text>Loading...</Text>}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(24 28 33)',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: 'rgb(145 162 178)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeFilter: {
    backgroundColor: 'rgb(38 78 103)', // Customize the active filter color
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    flex: 1,
    margin: spacing,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: itemWidth - spacing * 2,
    height: itemWidth * 1.5 - spacing * 2,
    borderRadius: 8,
  },
});

export default HomeScreen;
