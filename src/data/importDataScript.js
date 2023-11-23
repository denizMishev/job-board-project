const admin = require("firebase-admin");
const serviceAccount = require("deleted");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("firebase error", error);
  process.exit(1);
}

const db = admin.firestore();

const jsonData = require("./data2.json");

async function importData() {
  const batch = db.batch();

  try {
    for (const key in jsonData) {
      const docRef = db.collection("jobs2").doc();
      const dataWithoutId = { ...jsonData[key] };
      delete dataWithoutId.id;

      batch.set(docRef, dataWithoutId);
    }

    await batch.commit();
    console.log("import successful");
  } catch (error) {
    console.error("import failed:", error);
    process.exit(1);
  }
}

importData();
