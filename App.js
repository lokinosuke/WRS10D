import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 4; // Adjust the width as needed
const spacing = 8; // Adjust the spacing as needed

export default function App() {
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
        key={numColumns} // Change the key prop when numColumns changes
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={{ width: itemWidth - spacing, height: itemWidth * 1.5 - spacing }}
            />
          </View>
        )}
        ListEmptyComponent={() => <Text>Loading...</Text>}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, { opacity: page === 1 ? 0.5 : 1 }]}
          onPress={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} // Disable button if on the first page
        >
          <Text style={styles.paginationText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>{page}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => setPage((prevPage) => prevPage + 1)}
        >
          <Text style={styles.paginationText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  item: {
    flex: 1,
    marginTop: spacing,
    marginBottom: spacing,
    marginRight: spacing,
    alignContent: 'center',
    alignItems: 'center',
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
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
