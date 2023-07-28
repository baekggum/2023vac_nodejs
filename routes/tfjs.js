const express     = require('express');
const router      = express.Router();

const tf = require('@tensorflow/tfjs');

router.get('/regression1', function(req, res) {
    res.render('tfjs/regression1');
});
router.get('/regression2', function(req, res) {
    res.render('tfjs/regression2');
});
router.post('/regression2', async function(req, res) {
		//모델 로드
		//예측
    let model = await tf.loadLayersModel('https://raw.githubusercontent.com/baekggum/2023vac_nodejs/main/reg_model.json');
    model.summary();
    const data = req.body.data;
    let testX = data.split(',').map(function(x){
        return parseInt(x);
    });
    testX = tf.tensor(testX, [testX.length]);
    const preds = model.predict(testX).arraySync();
    res.send(preds);
});

//inference #1 tensorflow-hub 업로드한 이미지 분류
router.get('/inference1', async function(req, res) {
    res.render('tfjs/inference1');
});
//inference #2 mobilenet.js 업로드한 이미지 분류
router.get('/inference2', async function(req, res) {
    res.render('tfjs/inference2');
});
//inference #3 mobilenet.js 웹캠 분류
router.get('/inference3', async function(req, res) {
    res.render('tfjs/inference3');
});
//inference #4 ssd.js 웹캠 객체 탐지
router.get('/inference4', async function(req, res) {
    res.render('tfjs/inference4');
});

// transfer #1 yolov5 웹캠
router.get('/transfer1', async function(req, res) {
    res.render('tfjs/transfer1');
});

// transfer #2 tl모델 웹캠
router.get('/transfer2', async function(req, res) {
    res.render('tfjs/transfer2');
});

module.exports = router;