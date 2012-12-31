var cronJob = require('cron').CronJob,
    spawn   = require('child_process').spawn,
    logger  = require('winston'),
    oven    = require('pi-bake');

var updateSelf = {
  command : 'pacman',
  args    : 'Syu'
};

module.exports = {
  start : function() {
    var job = new cronJob('00 30 11 * * 1-5', function(){
        // Runs every weekday (Monday through Friday)
        // at 11:30:00 AM. It does not run on Saturday
        // or Sunday.
        logger.log('Starting update.');
        var strap = spawn(cmd, args);

        strap.stdout.on('data', function(d) {
          logger.info(d);
        });
        strap.stderr.on('data', function(d) {
          logger.error(d);
        });
        strap.on('exit', function(code) {
          if (code === 0) {
            logger.log('System update successful.');
          }
          else {
            logger.log('System update failed.')
          }
        });
      }, function () {
        // update the strapped directory
        oven.strap();
      }, 
      true /* Start the job right now */,
      "GMT" /* Time zone of this job. */
    );
  }
}