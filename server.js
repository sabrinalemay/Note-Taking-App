const path = require("path");
const express = require("express");
const { notes } = require("./db/db.json");
const fs = require("fs");
// const util = require("util");
// const { createInflateRaw } = require("zlib");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

function findAll(query, notesArr) {
    let filterNotes = notesArr
    if (query.title){
        filterNotes = filterNotes.filter(
            (note) => note.title === query.title,
        )
    } return filterNotes
}

function findById(id, notesArr) {
    const result = notesArr.filter((notes) => notes.id === id)
    return result
}

function createNew(body, notesArr) {
    const note = body
    notesArr.push(note)
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notes: notesArr}, null, 2)
    )
    return note
} 

app.get("/api/notes",(req, res) => {
    let results = notes
    if (req.query) {
        results = findAll(req.query, results)
    }
    res.json(results)
})

app.get("/api/notes/:id", (req,res) => {
    const result = findById(req.params.id, notes)
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
})

app.post("api/notes", (req,res) => {
    req.body.id = notes.length.toString()
    const note = createNew(req.body, notes)
    res.json(note)
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, function(){
    console.log("app listening" + PORT);
});