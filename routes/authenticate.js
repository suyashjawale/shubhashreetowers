const express = require('express')
const router = express.Router()
const CryptoJS = require('crypto-js');

const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

router.post('/', function (req, res) {
    if (req.session.user_id == "c3V5YXNoamF3YWxlQGdtYWlsLmNvbQ==") {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<center><img src="bahut-tez.gif" width="300" height="300"></img></center>'));
    } else {
        let username = encrypt(req.body.email);
        let password = encrypt(req.body.password);
        if (username == "c3V5YXNoamF3YWxlQGdtYWlsLmNvbQ==" && password == "Ym9yaXNAMTIzNDU=") {
            req.session.user_id = "c3V5YXNoamF3YWxlQGdtYWlsLmNvbQ==";
            res.sendStatus(200);
        } else {
            res.status(400).send('Invalid Username and Password');
        }
    }
})

module.exports = router