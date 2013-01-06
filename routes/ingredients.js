var db = require('nano')('http://localhost:5984/packages');

/*
 * GET home page.
 */
exports.get = function(req, res){
  var id = req.params.id;
  db.get(id, function(err, body) {
    if (!err) {
      res.send(body);
    }
    else {
      res.send('No package with that id')
    }
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  db.delete(id, function(err, body) {
    res.send('Successfully deleted ' + id);
  });
  
};

exports.create = function(req, res) {
  var packageModel = req.body.package;

  console.log(req);
  //res.send(packageModel);
  db.insert(packageModel, function(err, body) {
    if (!err) {
      res.send('Successfully inserted new package');
    }
    else {
      res.send(503, 'Database   currently unavailable')
    }
  });
};

exports.all = function(req, res) {
  db.list({ 'include_docs' : true }, function(err, body) {
    if (!err) {
      console.log('Getting all ' + body.rows.length + ' packages from database');
      res.send(body.rows);
    }
    else {
      res.send('No data : ' + err);
    }
  });
};