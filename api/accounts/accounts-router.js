const router = require('express').Router();

const accountsModel = require('./accounts-model');

const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  accountsModel
    .getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => next(err));
});

router.get('/:id', checkAccountId, (req, res, next) => {
  const id = req.params.id;
  accountsModel
    .getById(id)
    .then((account) => {
      res.json(account);
    })
    .catch((err) => next(err));
});

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    accountsModel
      .create(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => next(err));
  }
);

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  const { id } = req.params;
  accountsModel
    .updateById(id, req.body)
    .then(() => {
      res
        .status(200)
        .json({ id, name: req.body.name, budget: req.body.budget });
    })
    .catch((err) => next(err));
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const { id } = req.params;
  const accountToDelete = await accountsModel.getById(id);
  accountsModel
    .deleteById(id)
    .then(() => {
      res.json(accountToDelete);
    })
    .catch((err) => next(err));
});

router.use((err, req, res, next) => {
  console.log('Error', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
