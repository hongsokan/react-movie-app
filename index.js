import dotenv from 'dotenv';
import path from 'path';

const express = require('express')
const app = express()
const port = 3000

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
  )
});

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.id}:${process.env.password}@boiler-plate.gy3yl.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})