import admin from "functions/admin";
import bcrypt from "bcrypt";

const register = async (res) => {
  const { name, email, password } = res?.body?.data;
  const db = admin.firestore();

  db.collection("users")
    .add({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(async (res) => {
      await fetch("/api/auth/signin/:CredentialsProvider");
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  res.send("ok");
};

export default register;
