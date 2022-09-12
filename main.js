const path = require('path');


const routes = require('./routes.js');
const errorController = require('./errorController');

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, "images")));
app.use(routes);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(3000);
