const TryCatch = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {

      if (res.headersSent) {
        return next(error);
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = { TryCatch };