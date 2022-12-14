const express =require('express');

const morgan = require('morgan');
const app= express();
const cors = require('cors')

app.use(cors({
    origin:'*'
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index'))
app.use(morgan('dev'));


module.exports=app;