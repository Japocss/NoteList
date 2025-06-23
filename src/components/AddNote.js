import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

export default function AddNote({ isVisible, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetFields = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Nova Anotação</Text>

        <TextInput
          placeholder="Título"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Descrição"
          style={[styles.input, { height: 80 }]}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              resetFields();
              onCancel();
            }}
          >
            <Text style={styles.cancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSave({ title, description });
              resetFields();
            }}
          >
            <Text style={styles.save}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0008",
  },
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    borderRadius: 8,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#1abc9c",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
    padding: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancel: {
    marginRight: 20,
    color: "#e74c3c",
    fontWeight: "bold",
  },
  save: {
    color: "#1abc9c",
    fontWeight: "bold",
  },
});
