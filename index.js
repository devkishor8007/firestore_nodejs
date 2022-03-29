const express = require("express");
const cors = require("cors");
const app = express();
const { collectionRefs } = require("./config");
const collectionRef = collectionRefs();

app.use(express.json());
app.use(cors());

// get the 10 elements as sorted by name
app.get("/", (req, res) => {
  try {
    collectionRef.orderBy('name').startAt(0).limit(10).get().then((snap) => {
      snap.forEach((element) => {
        // get the data 
        console.log(element.data());
        // get the data as name only
        console.log(element.data().name);
      });
    });
  } catch (e) {
    res.send(e);
  }
});


app.post("/", async (req, res) => {
  const head = Date.now().toString(6);
  // schemas of db
  const data = {
    // name - string
    name: req.body.name,
    // age - number
    age: req.body.age,
  };
  await collectionRef.doc(head).set(data);
  res.send("creating the data in firestore");
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await collectionRef.doc(id).delete();
  res.send("delete the data in firestore");
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    age: req.body.age,
  };
  await collectionRef.doc(id).update(data);
  res.send("update the data in firestore");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
