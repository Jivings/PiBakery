
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('bakery', { title: 'Welcome to the Bakery' });
};

exports.ingredients = function(req, res) {
  res.render('ingredients', {title: 'Ingredient list'});
}