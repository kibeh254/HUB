import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
export default function HomeScreen() {
  const db = SQLite.openDatabaseSync('bookhub.db');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [eventLogs, setEventLogs] = useState<string[]>([]);

  const login = () => {
  logEvent('Login button pressed');

  if (username === 'student' && password === '1234') {
    logEvent('Login Successful');
    Alert.alert('Success', 'Login Successful');
  } else {
    logEvent('Login Failed');
    Alert.alert('Error', 'Invalid Username or Password');
  }
};

  const registerStudent = () => {
    if (!studentName || !regNumber || !course) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    const newStudent = {
      id: Date.now().toString(),
      studentName,
      regNumber,
      course,
    };

    setStudents([...students, newStudent]);
db.runSync(
  `INSERT INTO students (studentName, regNumber, course)
   VALUES (?, ?, ?)`,
  [studentName, regNumber, course]
);
    setStudentName('');
    setRegNumber('');
    setCourse('');
    logEvent('Student Registered');

    Alert.alert('Success', 'Student Registered');
  };
  const logEvent = (message: string) => {
  setEventLogs((prev) => [
    `${new Date().toLocaleTimeString()} - ${message}`,
    ...prev,
  ]);
};
 useEffect(() => {
  db.execSync(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    regNumber TEXT,
    course TEXT
  );
`);
const savedStudents = db.getAllSync(
  'SELECT * FROM students'
);

setStudents(savedStudents);

    fetch('https://openlibrary.org/search.json?q=novel')
      .then((response) => response.json())
      .then((data) => setBooks(data.docs.slice(0, 10)))
      .catch(() =>
        Alert.alert('Error', 'Failed to load books')
      );
  }, []);

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
  onKeyPress={({ nativeEvent }) =>
    logEvent(`Username Key: ${nativeEvent.key}`)
  }
/>

      <TextInput
  style={styles.input}
  placeholder="Password"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
  onKeyPress={({ nativeEvent }) =>
    logEvent(`Password Key: ${nativeEvent.key}`)
  }
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

      <Text style={styles.section}>Student Registration</Text>

      <View style={styles.bookCard}>
        <TextInput
          style={styles.input}
          placeholder="Student Name"
          value={studentName}
          onChangeText={setStudentName}
        />

        <TextInput
          style={styles.input}
          placeholder="Registration Number"
          value={regNumber}
          onChangeText={setRegNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />

        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    logEvent('Register button tapped');
    registerStudent();
  }}
  onLongPress={() => {
    logEvent('Register button long pressed');
    Alert.alert(
      'Long Press',
      'You held the Register Student button.'
    );
  }}
>
  <Text style={styles.buttonText}>
    Register Student
  </Text>
</TouchableOpacity>
      </View>

      <Text style={styles.section}>
        Registered Students
      </Text>

      {students.map((student) => (
        <View
          key={student.id}
          style={styles.bookCard}
        >
          <Text>
            Name: {student.studentName}
          </Text>

          <Text>
            Reg No: {student.regNumber}
          </Text>

          <Text>
            Course: {student.course}
          </Text>
        </View>
      ))}

      <Text style={styles.section}>
        Error Handling Demo
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert(
            'Network Error',
            'Unable to connect to the server.'
          )
        }
      >
        <Text style={styles.buttonText}>
          Test Error Handling
        </Text>
      </TouchableOpacity>

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

      <Text style={styles.section}>
        Books From API
      </Text>

      <FlatList
        scrollEnabled={false}
        data={books}
        keyExtractor={(item: any, index) =>
          index.toString()
        }
        renderItem={({ item }: any) => (
          <View style={styles.bookCard}>
            <Text style={styles.bookTitle}>
              {item.title}
            </Text>
          </View>
        )}
      />
      <Text style={styles.section}>
  Event Log
</Text>

{eventLogs.length === 0 ? (
  <Text>No events recorded yet.</Text>
) : (
  eventLogs.map((log, index) => (
    <View
      key={index}
      style={styles.bookCard}
    >
      <Text>{log}</Text>
    </View>
  ))
)}
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