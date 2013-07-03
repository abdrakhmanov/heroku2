
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

/*
 * Страница для тех, у кого отключен JS
 */
 
exports.nojs = function(req, res){
  res.render('nojs');
};