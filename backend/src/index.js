const express = require("express");
const app = express();
const Person = require("./connection");

app.use(express.json())

app.post("/items", async (req, res) => {
  const {name, description} = req.body

  const person = new Person({name: name, description: description})
  await person.save()
  
  res.status(400).send("Saved");  
});

app.get("/items/:page", (req, res) => {
  const perPage = 5;
  const page = req.params.page || 1;
  const search = req.query.search || "";

  Person.find({ $text : { $search: search, $caseSensitive: false}})
  .skip(perPage * page - perPage)
  .limit(perPage)
  .exec((err, items) => {
    Person.countDocuments({ $text : { $search: search, $caseSensitive: false} }).exec((err, count) => {
      if (err) return res.status(400).send(err);
      res.json({
        items,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});

app.listen(9696, () => {
  console.log(`Example app listening on port ${9696}`)
})

