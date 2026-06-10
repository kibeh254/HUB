import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BooksScreen() {
  const books = [
    'The River and The Source',
    'Fathers of Nations',
    'A Doll House',
    'Blossoms of the Savannah',
    'Betrayal in the City',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Books Library</Text>

      {books.map((book, index) => (
        <View key={index} style={styles.card}>
          <Text>{book}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});