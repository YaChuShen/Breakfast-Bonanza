import admin from "../../../../functions/firebase/admin";

const login = async (res) => {
  const { email, password } = res?.body?.data;
  console.log(email, password);
  // const db = admin.firestore();

  // const userRef = await db
  //   .collection("users")
  //   .where("email", "==", email)
  //   .where("password", "==", password)
  //   .get();

  // console.log(userRef);
  // if (userRef.size) {
  //   return res.json({ name: userRef.name });
  // }
};

export default login;
