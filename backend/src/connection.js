const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/full", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PersonSchema = new mongoose.Schema({
  name: String
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person
