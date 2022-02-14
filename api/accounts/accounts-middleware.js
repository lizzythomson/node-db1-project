const accountsModel = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  console.log(isNaN(req.body.budget));
  if (
    !req.body.name ||
    req.body.budget === undefined ||
    req.body.budget === null
  ) {
    console.log('HERE 1');
    res.status(400).json({ message: 'name and budget are required' });
  } else if (req.body.name.trim().length < 3 || req.body.name.length > 100) {
    console.log('HERE 2');
    res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' });
  } else if (isNaN(req.body.budget)) {
    console.log('HERE 3');
    res.status(400).json({ message: 'budget of account must be a number' });
  } else if (
    Math.sign(Number(req.body.budget)) === -1 ||
    Number(req.body.budget) > 1000000
  ) {
    console.log('HERE 4');
    res
      .status(400)
      .json({ message: 'budget of account is too large or too small' });
  } else {
    console.log('HERE 5');
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
