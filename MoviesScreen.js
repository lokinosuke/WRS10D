import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Pressable, Image, Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 4;
const spacing = 8;

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numColumns] = useState(4);
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=ed9fb3b24c6dda41ce9b077a7120897d&language=en&page=${page}`;

  const fetchData = (url) => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(url);
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={`flatlist-${numColumns}`}
        data={data}
        keyExtractor={(item) => item.id.toString()}
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
      />
      <View style={styles.paginationContainer}>
        <Pressable
          style={[styles.paginationButton, { opacity: page === 1 ? 0.5 : 1 }]}
          onPress={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          <Text style={styles.paginationText}>{'<'}</Text>
        </Pressable>
        <Text style={styles.paginationText}>{page}</Text>
        <Pressable
          style={styles.paginationButton}
          onPress={() => setPage((prevPage) => prevPage + 1)}
        >
          <Text style={styles.paginationText}>{'>'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 20,
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  paginationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
