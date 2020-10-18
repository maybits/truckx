

module.exports = function(app){

  app.get('/v1/hello', function(req, res, next){
    res.send('hello');
  });
};
