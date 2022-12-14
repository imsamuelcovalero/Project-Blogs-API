const errorMiddleware = (err, _req, res, _next) => {
 console.error('error', err); 
  res.status(err.status || 500).json({
      // code: err.code || 'undefinedError',
      message: err.message,
  });
};

module.exports = errorMiddleware;