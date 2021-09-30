const express = require('express');

const IndexRouter = require('./routes/IndexRouter');
const DataRouter = require('./routes/DataRouter');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
});

app.use('/data', DataRouter);
app.use('/', IndexRouter);

app.listen(PORT, function () {
	console.clear();
	console.log('Running server port', PORT);
});

module.exports = app;
