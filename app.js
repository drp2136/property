const CookieParser = require('cookie-parser');
const Express = require('express');
const Helmet = require('helmet');
const Mongoose = require('mongoose');
const Logger = require('morgan');
const Path = require('path');
// const SocketIo = require('socket.io');
// const SwaggerUiDist = require('swagger-ui-dist').absolutePath();

const Users = require('./routes/users');

let app = Express();

// // setting up SOCKET
// app.io = SocketIo();

// view engine setup
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, captcha, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(Logger('dev'));
app.use(Express.json({ limit: '5mb' }));
app.use(Express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(Express.static(Path.join(__dirname, 'public')));
app.use(Helmet.frameguard({ action: 'deny' }));

// // Swagger CSS/Images/Js
// app.use("/swagger", Express.static(SwaggerUiDist));
// // Swagger JSON
// app.use("/openapi-data", Express.static(`${__dirname}/data/openapi/`));
// // Swagger HTML
// // app.use("/documents", Express.static(`${__dirname}/public/swagger`));
// app.use("/documentation", Express.static(`${__dirname}/public/swagger`));
// app.use("/documentation/socket", (req, res, next) => { res.render('socket.ejs'); });

app.use('/', Users);
app.get('/property/images/*', (req, res, next) => {
  console.log(req.method);
  res.send({ code: 200, message: 'healthy' });
});

app.get('/health', (req, res, next) => {
  res.send({ code: 200, message: 'healthy' });
});
// // socket Module..
// const socketApis = require('../utils/SocketFile.js')(app.io);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.code = 404
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log("err======app=====", err);
  if (err.error && err.error.isJoi) {
    // res.status(400).json({
    //   type: err.type, // will be "query" here, but could be "headers", "body", or "params"
    //   message: err.error.toString()
    // });
    res.status(400).json({
      code: 400,
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      data: err.error.details.map(e => {
        console.log(e);
        if (e.path.length > 0) {
          let eP = e.path.join('.');
          let eM = e.message.split(' ');
          eM.shift();
          return eP + ' ' + eM.join(' ');
        }
        return e.message;
      }),
      message: err.error.message,
    });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.code || 500);
    res.json({
      message: err.message,
      code: err.code,
    });
  }
});

try {
  Mongoose.connect(
    encodeURI('mongodb+srv://ranjan:ranjan@treads.te4da.mongodb.net/property?retryWrites=true&w=majority'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true, // DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
  });
  Mongoose.connection.on('open', (ref) => {
    console.log('Connected to mongo server.');
  });
} catch (e) {
  console.log(e);
}


module.exports = app;
