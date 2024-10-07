const { db } = require("../../config.js");

const { addDoc, collection } = require("firebase/firestore");

exports.create = async (newUser) => {
  try {
    const docRef = await addDoc(collection(db, "users"), newUser);

    return {
      message: "User created successfully",
      documentId: docRef.id,
    };
  } catch (error) {
    throw new Error("Error saving user to Firestore: " + error.message);
  }
};