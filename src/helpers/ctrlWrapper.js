const ctrlWrapper = (control) => {
  const func = async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
