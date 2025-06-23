import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import "moment/locale/pt-br";

export default function Note({ note, onDelete }) {
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(note.id)}
    >
      <Icon name="trash" size={20} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.noteContainer}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {note.description}
        </Text>
        <Text style={styles.date}>
          {moment(note.createdAt).locale("pt-br").format("D MMM, YYYY")}
        </Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    color: "#444",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
});
