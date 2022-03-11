const cors = require('cors');

const whitelist = ['https://localhost:4620', 'http://localhost:4500', 'http://localhost:3000'];

const corsWithOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1 ){
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsWithOptionsDelegate);