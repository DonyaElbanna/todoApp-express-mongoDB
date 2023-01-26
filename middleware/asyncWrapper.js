const asyncWrapper = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = asyncWrapper;
