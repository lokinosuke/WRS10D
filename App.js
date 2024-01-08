import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Dimensions, Button } from 'react-native';

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
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          title="Prev Page"
          disabled={page === 1} // Disable button if on the first page
        />
        <Button
          onPress={() => setPage((prevPage) => prevPage + 1)}
          title="Next Page"
        />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
