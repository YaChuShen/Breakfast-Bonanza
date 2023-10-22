import admin from "functions/admin";

const pointsTable = async (res) => {
  console.log(res?.body);
  const { profileId, score } = res?.body;
  const db = admin.firestore();

  try {
    await db.collection("users").doc(profileId).update({ score });
    // let scroe = userSnap.exists ? userSnap.data().score : "";

    return res.send("ok");
  } catch (e) {
    console.error(e);
    return res.status(401).send(e.code);
  }
};

export default pointsTable;
