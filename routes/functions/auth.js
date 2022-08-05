const path = require('path');

const auth = function(req, res, next) {
    if (req.session.user_id != "c3V5YXNoamF3YWxlQGdtYWlsLmNvbQ==") {
        res.sendFile('admin.html', {
            root: path.join(__dirname, '../../private')
        });
    } else {
        next()
    }
}

module.exports= auth