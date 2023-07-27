const express     = require('express');
const router      = express.Router();

router.get('/regression1', function(req, res) {
    res.render('tfjs/regression1');
});
router.get('/regression2', function(req, res) {
    res.render('tfjs/regression2');
});
router.post('/regression2', async function(req, res) {
		//모델 로드
		//예측
    res.send('예측결과');
});

module.exports = router;