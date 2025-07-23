const express = require('express');
const routes = require('./routes/index');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());          
app.use(express.urlencoded());   

app.use('/api', routes);
app.use('/api', routes);

app.listen(3000);
