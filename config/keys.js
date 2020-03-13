if(process.env.NODE_ENV === 'production'){
    //in production
    module.exports = require('./prod');
} else{
    //In development
    module.exports = require('./dev');
}