const path = require("path");
const express = require("express");
const fs = require("fs");
const util = require("util");
const { application } = require("express");

const readAsyncFile = util.promisify(fs.readFile);
const writeAsyncFile = util.promisify(fs.writeFile);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("./Develop/public"));

// POST 
app.post("/api/notes", function(req, res){
    const appNotes = req.body;
    readAsyncFile('./Develop/db/db.json','utf-8').then(function(data){
        const notes = [].concat(JSON.parse(data));
        appNotes.id = notes.length +1
        notes.push(appNotes);
        return notes
    }).then(function(notes){
        writeAsyncFile('./Develop/db/db.json', JSON.stringify(notes))
        res.json(appNotes);
    })
});

// GET
app.get('/api/notes', function(req,res){
    readAsyncFile('./Develop/db/db.json', 'utf-8').then(function(data){
        const notes =[].concat(JSON.parse(data));
        res.json(notes);
    })
});

// DELETE
app.delete('api/notes/:id', function(req,res){
    const deleteNote = parseInt(req.params.id);
    readAsyncFile('./Develop/db/db.json', 'utf-8').then(function(data){
        const notes =[].concat(JSON.parse(data));
        const notesData = []
        for (let i = 0; i<notes.length; i++){
            if(deleteNote !== notes[i].id){
                notesData.push(notes[i])
            }
        }
        return notesData
    }).then(function(notes){
        writeAsyncFile('./Develop/db/db.json', JSON.stringify(notes))
        res.send('successful save')
    })
});

app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

app.listen(PORT, function(){
    console.log("app listening" + PORT);
});