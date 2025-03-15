// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3001));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', (req, res) => {
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', (req, res) => {
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const comments = JSON.parse(data);
        const newComment = {
            id: Date.now(),