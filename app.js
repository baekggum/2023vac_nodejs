const express = require('express'); // express 패키지 import
const app = express();  // express에 정의된 app 객체 생성

const passport          = require('passport');
const passportConfig    = require('./passport');
const session           = require('express-session');
const flash             = require('connect-flash');

passportConfig()

//세션 설정
app.use(
    session({
       resave: false,
       saveUninitialized: false,
       secret: "sessionsecretsessionsecret",
    }),
);
//passport 초기화
app.use(passport.initialize()); //req에 passport 설정 추가
app.use(passport.session());    //req.session에 passport 데이터 추가
app.use(flash());

// template로 사용할 views 디렉토리를 /views로 설정
app.set('views',__dirname+'/views');
// template engine으로 ejs사용
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));

//라우트 객체 생성
//라우트 객체 생성
const mainRouter = require('./routes/index');
const dustRouter = require('./routes/dust');
const userRouter = require('./routes/user');
const newsRouter = require('./routes/news');
const wifiRouter = require('./routes/wifi');
const maskRouter = require('./routes/mask');
const tfjsRouter = require('./routes/tfjs');

//mainRouter로 처리
app.use('/', mainRouter);
app.use('/dust', dustRouter);
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/wifi', wifiRouter);
app.use('/mask', maskRouter);
app.use('/tfjs', tfjsRouter);

// 라우트 설정
// app.use('/', mainRouter);

const PORT = 8080;  //클라이언트의 요청을 대기할 포트 설정
app.listen(PORT, function(){    // 8080으로 요청 대기
    console.log('Listening on port : ', PORT);
});

// //res.sendFile : 응답으로 파일을 보낼 때 사용하는 함수
// app.get('/main', function(req,res){ // 서버 주소/main으로 GET 요청이 들어왔을 때 처리할 함수
//     res.sendFile(__dirname+'/main.html');  // req는 request정보를 저장하고 있는 객체, res는 응답을 저장할 객체
// });
// app.get('/test', function(req,res){ 
//     res.sendFile(__dirname+'/test.html');  // req는 request정보를 저장하고 있는 객체, res는 응답을 저장할 객체
// });





