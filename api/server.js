const express = require('express');
const app = express();
const mongoose = require('./config/db');
const cors = require('cors');

app.use(cors());

var db = mongoose.connection;
db.on('error', console.error.bind(console, '[DB] connection error:'));
db.once('open', function() {
	console.log('[DB] connected');
});

const port = process.env.PORT || 80;

app.listen(port);

app.use(express.json());

app.use('/', require('./routes/index'));
