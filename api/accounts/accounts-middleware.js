const accountsModel = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  req.body.name = req.body.name.trim();
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: 'name and budget are required' });
  } else if (req.body.name.length < 3 || req.body.name.length > 100) {
    res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' });
  } else if (isNaN(req.body.budget)) {
    res.status(400).json({ message: 'budget of account must be a number' });
  } else if (
    Math.sign(Number(req.body.budget)) === -1 ||
    Number(req.body.budget) > 1000000
  ) {
    res
      .status(400)
      .json({ message: 'budget of account is too large or too small' });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountId = async (req, res, next) => {
  const id = req.params.id;
  const result = await accountsModel.getById(id);
  if (!result) {
    res.status(404).json({ message: 'account not found' });
  } else {
    req.account = result;
    next();
  }
};
