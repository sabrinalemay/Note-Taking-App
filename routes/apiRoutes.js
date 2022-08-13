const store = require("../db/store");
const router = require("express").Router();


// POST 
// app.post("/api/notes", function(req, res){
//     const appNotes = req.body;
//     console.log(appNotes);
//     readAsyncFile('./db/db.json','utf-8').then(function(data){
//         const notes = [].concat(JSON.parse(data));
//         appNotes.id = notes.length +1
//         notes.push(appNotes);
//     }).then(function(notes){
//         writeAsyncFile('./db/db.json', JSON.stringify(notes))
//         res.json(appNotes);
//         return notes
//     })
// });

router.post("/notes", (req,res) => {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
   .catch((err) => res.status(500).json(err));
});

// GET
router.get("/notes", (req,res) => {
    store
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
    });


// DELETE
router.delete('/notes/:id', (req,res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true}))
    .catch((err) => res.status(500).json(err));
});


module.exports = router;