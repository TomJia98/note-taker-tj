const express = require('express');
const path = require('path');
const fs = require("fs");
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {

    console.log(req.body)
    res.sendFile(path.join(__dirname, '/db/db.json'))
});


app.post('/api/notes', (req, res) => {
    let newNote = req.body
    let parsedNotes = []

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {

          if (!data ==""){
            console.log(data + "_______________")
          parsedNotes = JSON.parse(data);
          }
          
          console.log(parsedNotes)
          newNote.id = (parsedNotes.length + 1)
          parsedNotes.push(newNote);
  
          fs.writeFile(
            'db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      })

res.status(200).send(`Note created!`);
}
);

app.delete("/api/notes/:id", (req, res) =>{
  console.log(req.params.id);
  const currentId = req.params.id
  
  
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data)
      let myArray = JSON.parse(data)
      let newArray = myArray.filter((item) => item.id != currentId);
 
      fs.writeFile(
        'db/db.json',
        JSON.stringify(newArray, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully deleted note!')
      )


}})})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
