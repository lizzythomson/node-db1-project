const accountsModel = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  if (req.body.name === undefined || req.body.budget === undefined) {
    res.status(400).json({ message: 'name and budget are required' });
  } else if (req.body.name.trim().length < 3 || req.body.name.length > 100) {
    res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' });
  } else if (typeof req.body.budget !== 'number' || isNaN(req.body.budget)) {
    res.status(400).json({ message: 'budget of account must be a number' });
  } else if (
    Math.sign(Number(req.body.budget)) === -1 ||
    Number(req.body.budget) > 1000000
  ) {
    res
      .status(400)
      .json({ message: 'budget of account is too large or too small' });
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim();
  const allAccounts = await accountsModel.getAll();
  const duplicateName = allAccounts.find((account) => {
    return account.name === name;
  });
  if (duplicateName) {
    res.status(400).json({ message: 'that name is taken' });
  } else {
    next();
  }
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
