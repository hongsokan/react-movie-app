const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function( next ) {
    // index.js register router로 보내기 전에
    // 비밀번호를 암호화 시킨다. (bcrypt)
    var user = this;

    // 이름이나 이메일 변경하는 경우는 해당되지 않음
    // 비밀번호를 바꾸는 경우에만 비밀번호 암호화 진행
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                return next(err)
            }

            bcrypt.hash(user.password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return next(err)
                }
                user.password = hash // hash된 비밀번호로 바꿔준다
                next()
            })
        })
    } else {
        next()
    }
})


const User = mongoose.model('User', userSchema);

module.exports = { User }