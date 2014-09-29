var colors = require('colors')
  , Connection = require('tedious').Connection
  , Request = require('tedious').Request
  , moment = require('moment');

var config = {
  userName: 'YOUR_USER@YOUR_SERVER',
  password: 'YOUR_PASSWORD',
  server: 'YOUR_SERVER.database.windows.net',
  database: 'YOUR_DB',
  options: {encrypt: true}
};


var connection = new Connection(config)
  , interval = 0
  , minute = 60*1000
  , started = moment()

connection.on('debug', function(msg){
  log(("TDS\t" + msg).grey);
})

connection.on('connect', function(err) {
    if (err) {
      console.error(err);
    } else {
      executeStatement();
    }
  }
);

function executeStatement() {
  var request = new Request("select getdate()", function(err) {
    if (err) {
      console.error(err);
    }

    interval++;
    setTimeout(executeStatement, interval*minute);
  });

  request.on('row', function(columns) {
    log(('<<<\t'+columns[0].value).yellow);
  });

  log('>>>\t'+request.sqlTextOrProcedure.green)
  connection.execSql(request);
}

function log(msg){
  var passed = moment.utc(moment().diff(started));
  console.log(passed.format('mm:ss'), msg);
}