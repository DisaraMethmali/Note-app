const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {

    }).then(() => console.log('Db connected')).catch(err => console.log(err));

};
module.exports = dbConnect;
