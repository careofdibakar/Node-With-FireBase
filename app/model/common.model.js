const { db } = require("../../config.js");

const {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

exports.create = async (collectionName, newUser) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), newUser);

    return {
      message: "Data inserted",
      documentId: docRef.id,
    };
  } catch (error) {
    throw new Error("Error saving user to Firestore: " + error.message);
  }
};

exports.getData = async (searchParams, collectionName) => {
  const docRef = collection(db, collectionName);

  const constraints = [];

  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      constraints.push(where(key, "==", value));
    }
  }

  const searchQuery = query(docRef, ...constraints);

  try {
    const docSnap = await getDocs(searchQuery);

    if (docSnap.empty) {
      console.log("No data found.");
      return null;
    }

    const data = [];

    docSnap.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return {
      status: true,
      message: "Success",
      data: data,
    };
  } catch (error) {
    throw new Error("Error fetching the data: " + error.message);
  }
};

exports.edit = async (documentID, updateData, collectionName) => {
  const docRef = doc(db, collectionName, documentID);

  try {
    const data = await updateDoc(docRef, updateData);
    return {
      status: true,
      message: "Success",
      data: data,
    };
  } catch (error) {
    throw new Error("Error updating document: " + error.message);
  }
};

exports.delete = async (documentID, collectionName) => {
  const docRef = doc(db, collectionName, documentID);

  try {
    await deleteDoc(docRef);
    return {
      status: true,
      message: "Success",
    };
  } catch (error) {
    throw new Error("Error deleting document: " + error.message);
  }
};
