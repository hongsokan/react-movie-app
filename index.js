const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const config = require('./config/key');

const { User } = require('./models/User');

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// body-parser (각자 아래와 같은 형식의 데이터를 가져올 수 있다)
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// register router (postman으로 request 보내기)
app.post('/register', (req, res) => {

  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  // 몽고DB에서 오는 메서드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})