function errorHandler(err, req, res, next){
  return res.status(err.status || 500).json({
    err: {
      status: err.status,
      message: err.message || "Something went wrong"
    }
  });
}

module.exports = errorHandler;