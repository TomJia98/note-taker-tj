const fs = require("fs");// setting dependencies


const writeFile = (note) => {fs.writeFile(
    'db/db.json',
    JSON.stringify(note, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );//writes whatever is passed into the function to the db
}

module.exports = writeFile