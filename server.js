// Simple backend - stores submissions to JSON files (data/) and responds with JSON.
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
// Serve static frontend
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname)));


// Ensure data folder exists
const DATA_DIR = path.join(__dirname, 'data');
if(!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);


function saveJSON(filename, obj){
const filePath = path.join(DATA_DIR, filename);
let arr = [];
if(fs.existsSync(filePath)){
try{ arr = JSON.parse(fs.readFileSync(filePath)); }catch(e){ arr = []; }
}
obj._receivedAt = new Date().toISOString();
arr.push(obj);
fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
}


app.post('/api/contact', (req, res)=>{
const {name,email,subject,message} = req.body;
if(!name || !email || !message) return res.status(400).json({e