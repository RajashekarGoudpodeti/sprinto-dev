const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/Routes")
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())  

app.use(express.static(path.resolve(__dirname, '../client/build')));


mongoose.connect(
  `mongodb+srv://admin:password12345@cluster0.kuqix.mongodb.net/sprinto_dev?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); 




