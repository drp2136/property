#!/usr/bin/env node

/**
 * Module dependencies.
 */
const Cluster = require('cluster');
const Debug = require('debug')('treads-web:server');
const Http = require('http');
const Optimist = require('optimist');
const OS = require('os');

let app = require('../app');
// let To = require('../../utils/To');

let args = Optimist.argv;
let cpuCount = Math.ceil(OS.cpus().length / 2);
let server;


new Promise(async (resolve, reject) => {
  try {
    // Initialize
    let error, dbResult;

    // //#region - Database connection
    // // Imports
    // const DbConnectHelper = require('../../database/helpers/connection');

    // // Establish
    // let dbParams = {
    //   // connectionParams: {
    //   //   url: SettingCache.get(CacheKey.UGS_SERVER.DATABASE.UGS.URL)
    //   // },
    //   // options: {
    //   //   useNewUrlParser: SettingCache.get(CacheKey.UGS_SERVER.DATABASE.UGS.USE_NEW_URL_PARSER)
    //   // }
    // };
    // [error, dbResult] = await To(DbConnectHelper.connect(dbParams.connectionParams, dbParams.options));
    // if (error) {
    //   throw new AppError(error.message, error.code, error.data);
    // }
    // //#endregion - Database connection


    //#region - Server Start 
    /**
     * Get port from environment or command line AND store in Express.
     */
    let port = normalizePort(process.env.PORT || '4001');
    if (args && args.port) {
      port = parseInt(args.port);
      console.log(`Port provided is ${port}.`);
    }
    app.set('port', port);

    if (Cluster.isMaster) {
      console.log("Cluster.isMaster : " + Cluster.isMaster);
      for (let i = 0; i < cpuCount; i++) {
        Cluster.fork();
      }
      Cluster.on('exit', function (worker) {
        Cluster.fork();
      });
    } else {
      /**
       * Create HTTP server.
       */
      server = Http.createServer(app);

      // /**
      //  * Socket.io
      //  */
      // let io = app.io;
      // io.attach(server);

      /**
       * Listen on provided port, on all network interfaces.
       */
      server.listen(port);
      server.on('error', onError);
      server.on('listening', onListening);
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
      let port = parseInt(val, 10);
      if (isNaN(port)) {
        // named pipe
        return val;
      }
      if (port >= 0) {
        // port number
        return port;
      }
      return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
      let addr = server.address();
      let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      console.info('Listening on ' + bind);
    }
    //#endregion - Server

    resolve();
  } catch (error) {
    console.dir(error);
    if (error && error.code && error.message) {
      reject(error);
    } else {
      reject({ code: 500, message: "Error while starting kafka device event message processor: " + error });
    }
    exitProcess();
  }
});

function exitProcess() {
  process.exit(1);
}
