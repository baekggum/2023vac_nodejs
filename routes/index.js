const express = require('express'); // express 패키지 import
const router = express.Router();
const auth = require('./auth');

router.get('/', auth.CheckAuth, function(req,res){
    // res.status(201).send("라우트를 사용한 메인 페이지입니다.");
    // res.render('index', {name: '김현민', age: '24', job: '대학생'});
    res.render('index');
});

module.exports = router;

