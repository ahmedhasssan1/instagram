// // src/firebase/index.ts
// import * as admin from "firebase-admin";
// import { getDatabase } from "firebase-admin/database";
// import { readFileSync } from "fs";
// import { resolve } from "path";

// // Load service account JSON safely
// const serviceAccount = JSON.parse(
//   readFileSync(resolve(__dirname, "../serviceAccountKey.json"), "utf8")
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://instagram-486e8-default-rtdb.firebaseio.com"
// });

// const db = getDatabase();

// export async function writeExample() {
//   await db.ref("test").set({ message: "Hello from NestJS!" });
//   console.log("Data written successfully");
// }
