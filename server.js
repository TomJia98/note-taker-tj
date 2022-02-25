const express = require('express');
const path = require('path');
const fs = require("fs");
const PORT = 3001;
const writeFile = require("./helpers/writeFile")
// setting dependencies


const app = express();
//setting express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting middleware

app.use(express.static('public'));
//setting the default file for the browser

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//route for the notes.html, triggered by browser

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});
//gives the current notes to the browser on request

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    let parsedNotes = []
  //sets the data from the browser to newNote, init parsedNotes 
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          //logs the error, if there is one
        } else {

          if (!data ==""){
          parsedNotes = JSON.parse(data);
          }// checks if notes db contains anything, if it does, sets parsedNotes to the notes db

          newNote.id = (parsedNotes.length + 1)
          parsedNotes.push(newNote);
          //adds an id to the new note, and adds it to the other notes
          writeFile(parsedNotes);
          //writes the updated notes to the db
        }
      })
res.status(200).send(`Note created!`);
}
);

app.delete("/api/notes/:id", (req, res) =>{
  const currentId = req.params.id
  //sets the id of the deleted note to currentId
  
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
          //pulls the data from db
      let myArray = JSON.parse(data)
      let newArray = myArray.filter((item) => item.id != currentId);
      //checks db for the currentId, removes it and returns a new array
      writeFile(newArray)
      //writes that new array (now without the deleted object) to the db
}})})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);//all routes that arnt specified are sent to the index.html file

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
