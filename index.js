const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(
      "mongodb+srv://imanXpress:PRjdJbprsFneGg4j@cluster0.zbwte.mongodb.net/imanXpress?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("data base connected");
    })
    .catch((err) => console.log(err));

  ///creating schema
  const riderSchema = new mongoose.Schema({
    name: String,
    nid: String,
    salary: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  });

  ///create collection
  const Rider = mongoose.model("Rider", riderSchema);

  //post rider
  app.post("/addRider", async (req, res) => {
    try {
      const rider1 = new Rider({
        name: "Tushar",
        nid: "445456456",
        salary: 350000,
        date: Date(),
      });
      const rider2 = new Rider({
        name: "Tanvir",
        nid: "44543256456",
        salary: 360000,
        date: Date(),
      });
      const rider3 = new Rider({
        name: "Proloy",
        nid: "44545634456",
        salary: 3340000,
        date: Date(),
      });
      //insert one rider
      const result = await rider1.save();
      const resultMany = await Rider.insertMany([rider2, rider3]);
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  });

  ///find rider
  app.get("/rider", async (req, res) => {
    const rider = await Rider.find({});
    console.log(rider);
    res.json(rider);
  });
  //update one document

  const updateDocument = async () => {
    try {
      const result = await Rider.updateOne(
        { name: "Saiful" },
        { name: "Imtiaz Mahmod" }
      );
    } catch (err) {
      console.log(err);
    }
  };
  updateDocument();
  //delete one rider
  const deleteDocument = async (req, res) => {
    const deleteRider = await Rider.deleteOne({ name: "Misti" });
    console.log(deleteRider);
    res.send(deleteRider);
  };

  deleteDocument();
}

app.get("/", async (req, res) => {
  res.send("server ok");
});

app.listen(port, () => {
  console.log(`listening  ${port}`);
});
