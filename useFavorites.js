// useFavorites.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const updateFavoritesInStorage = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error updating favorites in storage:', error);
    }
  };

  const addFavorite = async (movieId) => {
    const updatedFavorites = [...favorites, movieId];
    await updateFavoritesInStorage(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const removeFavorite = async (movieId) => {
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    await updateFavoritesInStorage(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (movieId) => favorites.includes(movieId);

  useEffect(() => {
    const loadFavoritesFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from storage:', error);
      }
    };

    loadFavoritesFromStorage();
  }, []); // Only run this effect on component mount

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
