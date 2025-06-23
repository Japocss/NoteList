import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Note from "../components/Note";
import AddNote from "../components/AddNote";
import bg from "../../assets/notes-bg.jpg";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    setVisibleNotes(notes);
    AsyncStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const loadNotes = async () => {
    const data = await AsyncStorage.getItem("notes");
    const notes = data ? JSON.parse(data) : [];
    setNotes(notes);
  };

  const addNote = (note) => {
    if (!note.title || !note.title.trim()) {
      Alert.alert("Título obrigatório");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: note.title,
      description: note.description,
      createdAt: new Date(),
    };

    setNotes([...notes, newNote]);
    setShowAddNote(false);
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  return (
    <View style={styles.container}>
      <AddNote
        isVisible={showAddNote}
        onCancel={() => setShowAddNote(false)}
        onSave={addNote}
      />

      <ImageBackground source={bg} style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Anotações</Text>
      </ImageBackground>

      <View style={styles.noteList}>
        <FlatList
          data={visibleNotes}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Note note={item} onDelete={deleteNote} />
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddNote(true)}
      >
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 150,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#555",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  noteList: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#1abc9c",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
