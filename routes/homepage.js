const express = require('express')
const router = express.Router()
const redis = require("redis");
var parser = require('ua-parser-js');
var axios = require('axios');
const cheerio = require('cheerio');

let redisClient;

(async () => {
    // redisClient = redis.createClient({
    //     url: 'redis://:LqZu6ToMpLEz3oKhMck9fXnFHiLW2F0x@redis-17595.c212.ap-south-1-1.ec2.cloud.redislabs.com:17595'
    // });

    // redisClient.on("error", (error) => console.error(`Error : ${error}`));

    // await redisClient.connect();
})();

function send_message(message) {
    axios({
        method: 'get',
        url: `https://api.telegram.org/bot5577057746:AAFCP1nikR7jI-cW-r989dNOYxrgwIlc890/sendMessage?chat_id=2002841747&parse_mode=HTML&text=${message.join("\n")}`,
        headers: {}
    })
}

async function redis_DB(req, res, next) {
    const cacheResults = await redisClient.json.get('results')
    if (cacheResults) {
        res.render('index', { "data": cacheResults })
    }
    else {
        next();
    }
}

function telegram(req, res, next) {

    let ip = req.headers['x-forwarded-for']
    let ua = req.headers['user-agent']

    if (ip != null) {
        axios({
            method: 'get',
            url: `https://tools.keycdn.com/geo?host=${ip}`
        }).then(function (response) {
                let info = parser(ua)
                let message = []
                let $ = cheerio.load(response.data);
                $('#geoResult dd').each((index, element) => {
                    message.push($(element).text());
                });
                message.push(Object.values(info.browser))
                message.push(Object.values(info.device))
                message.push(Object.values(info.os))
                message.push(Object.values(info.cpu))
                send_message(message)
            })
            .catch(function (error) {
                send_message([ip]);
            });
    }
    next();
}

// router.get('/', telegram, redis_DB)
router.get('/')

module.exports = router
