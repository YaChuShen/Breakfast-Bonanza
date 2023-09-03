import admin from "../../../../functions/firebase/admin";

const register = async (res) => {
  const { name, email, password } = res?.body?.data;
  const db = admin.firestore();

  db.collection("users")
    .add({
      name,
      email,
      password,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  res.ok;
};

export default register;
