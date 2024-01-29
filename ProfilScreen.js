import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Button = ({ onPress, title = 'Save' }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

function ProfilScreen() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    console.log('Profil sauvegardé:', { username, profileImage });
    setShowProfileInfo(true);
    setIsEditing(false); // Passer en mode non-editable après avoir enregistré
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image
            source={require('./assets/anonymous.png')}
            style={styles.profileImage}
          />
        )}

        {showProfileInfo && !isEditing && (
          <>
            <Text style={styles.profileUser}>@{username}</Text>
          </>
        )}

        {isEditing && (
          <TouchableOpacity onPress={handleImagePick}>
            <Text style={styles.pickImageText}>
              {profileImage
                ? 'Change your profile pic'
                : 'Pick a Profile Image'}
            </Text>
          </TouchableOpacity>
        )}

        {isEditing && (
          <>
            <Text style={styles.label}>Pseudo</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </>
        )}

        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.pickImageText}>Modifier le profil</Text>
          </TouchableOpacity>
        )}

        {isEditing && (
          <Button onPress={handleSaveProfile} title="Save your profile" />
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1F1F1F", // Letterboxd uses a dark background color
    padding: 15,
  },
  topContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // Adjusted for better spacing
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#DDDDDD",
    backgroundColor: '#2E2E2E', // Letterboxd uses a darker input background
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#FFFFFF', // Text color for input
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65, // Adjusted for a circular profile image
    marginBottom: 10, // Adjusted for better spacing
  },
  pickImageText: {
    marginTop: 10,
    color: "#3498DB", // Letterboxd uses a blue color
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 5,
    color: "#A1A1A1",
    textTransform: 'uppercase',
  },
  profileName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF", // Text color for profile name
  },
  profileUser: {
    fontSize: 20,
    color: "#FFFFFF", // Text color for username
  },
  button: {
    backgroundColor: '#3498DB', // Letterboxd uses a blue color for buttons
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    width: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#FFFFFF', // Text color for buttons
  },
});

export default ProfilScreen;