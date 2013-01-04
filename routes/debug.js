var nano = require('nano')('http://localhost:5984');

/*
 * Some debug functions
 */

exports.init = function(req, res){
  // create a new database
  nano.db.create('packages', function() {
    // specify the database we are going to use
    res.send('Created database: "packages".');  
  });
};