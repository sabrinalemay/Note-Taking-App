const path = require("path");
const express = require("express");
const fs = require("fs");
const util = require("util");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function(){
    console.log("app listening" + PORT);
});