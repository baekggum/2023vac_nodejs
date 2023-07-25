const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', async function(req,res){
    url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    serviceKey = "qxZPZxPwmHxlvlX9Fp2a6aXEd71usYQMGoCeNjd6rQ1cfNSngTVnKlcI2yBZN20wmKH7Xu7VwkKvHd1QSJSaog%3D%3D";
    returnType = encodeURI("xml");
    numOfRows = encodeURI("100");
    pageNo = encodeURI("1");
    sidoName = encodeURI("대구");
    ver = encodeURI("1.0");

    queryParams = '?' + encodeURI('serviceKey')+'='+serviceKey;
    queryParams += '&' + encodeURI('returnType')+'='+returnType;
    queryParams += '&' + encodeURI('numOfRows')+'='+numOfRows;
    queryParams += '&' + encodeURI('pageNo')+'='+pageNo;
    queryParams += '&' + encodeURI('sidoName')+'='+sidoName;
    queryParams += '&' + encodeURI('ver')+'='+ver;

    console.log('queryParams ', queryParams);

    try{
        var context = new Array();

        const result = await axios.get(url+queryParams);
        
        const xml = result.data;

        const $ = cheerio.load(xml);

        const itemList = $('item');

        itemList.each(function(index,item){
            let stationName = $(item).find('stationName').text();
            let pm10Value = $(item).find('pm10Value').text();
            let pm25Value = $(item).find('pm25Value').text();

            context.push({stationName: stationName, pm10Value: pm10Value, pm25Value: pm25Value})
        });
        res.render('dust', {context: context});
    }catch(error){
        console.log(error);
    }
});

module.exports = router;