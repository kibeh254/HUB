import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (username === 'student' && password === '1234') {
      Alert.alert('Success', 'Login Successful');
    } else {
      Alert.alert('Error', 'Invalid Username or Password');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📚 BookHub</Text>

      <Text style={styles.subtitle}>
        Your Library. Your Stage. Your Success.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Categories</Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text>📖 Set Books</Text>
        </View>

        <View style={styles.card}>
          <Text>🎭 Plays</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text>📝 Notes</Text>
        </View>

        <View style={styles.card}>
          <Text>📚 Past Papers</Text>
        </View>
      </View>

      <Text style={styles.section}>Recently Added</Text>

      <View style={styles.bookCard}>
        <Text style={styles.bookTitle}>
          The River and The Source
        </Text>
        <Text>Margaret Ogola</Text>
      </View>

      <View style={styles.bookCard}>
        <Text style={styles.bookTitle}>
          Fathers of Nations
        </Text>
        <Text>Paul B. Vitta</Text>
      </View>

      <View style={styles.bookCard}>
        <Text style={styles.bookTitle}>
          A Doll's House
        </Text>
        <Text>Henrik Ibsen</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  section: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  bookCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});