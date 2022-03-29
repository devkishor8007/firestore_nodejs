exports.collectionRefs = function() {
  const admin = require("firebase-admin");

  const serviceAccount = require("./serviceAccountKeys.json");
  const e = require("express");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  const db = admin.firestore();
  return db.collection("sudents");
};
