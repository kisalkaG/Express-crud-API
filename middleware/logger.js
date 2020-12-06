const logger = function(req,res,next){
    console.log('middleware');
    next();
}

module.exports = logger;