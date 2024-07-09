import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import axios from "axios";

const TinyUrl = () => {
  const [inputUrl, setinputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handlePress = async () => {
    try {
      const response = await axios.post("https://url-shortner-a1gt.onrender.com/", {
        longurl: inputUrl,
      });

      console.log("Response Data:", response.data); // Log the response data for debugging

      if (response.data && response.data.data.short_url) {
        setShortUrl(response.data.data.short_url);
        Alert.alert("Shortened URL", response.data.data.short_url);
      } else if (response.data && response.data.message) {
        Alert.alert("Message", response.data.message);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to shorten the URL");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Enter URL"
        value={inputUrl}
        onChangeText={(inputUrl) => setinputUrl(inputUrl)}
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handlePress} style={styles.button}>
        Shorten URL
      </Button>
      <></>
      {shortUrl ? (
        <TextInput
          label="Shortened URL"
          value={shortUrl}
          editable={false}
          mode="outlined"
          style={styles.input}
        />
      ) : null}
    </View>
  );
};

export { TinyUrl };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    padding: 8,
    marginBottom:10,
  },
});
