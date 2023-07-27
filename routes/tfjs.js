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

module.exports = router;