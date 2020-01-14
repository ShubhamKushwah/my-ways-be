const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', function (err) {
    console.log('ERR.MONGOOSE: ', err);
    process.exit(-1);
});

const MONGO_URI = 'mongodb://shubham:pass123@ds263368.mlab.com:63368/my-ways-be';
// Hardcoded for now.

try {
    console.log("==== " + MONGO_URI + " ====");
    mongoose.connect(MONGO_URI, {
        keepAlive: true,
        reconnectTries: 100,
        useNewUrlParser: true,
        useCreateIndex: true
    });
} catch (err) {
    console.log('ERR.MONGOOSE.CONNECT: ', err);
    process.exit(-1);
}

module.exports = mongoose;
