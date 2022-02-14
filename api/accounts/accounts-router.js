const router = require('express').Router();

const accountsModel = require('./accounts-model');

const {
  checkAccountId,
  checkAccountPayload,
} = require('./accounts-middleware');

router.get('/', (req, res) => {
  accountsModel
    .getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'error occurred' });
    });
});

router.get('/:id', checkAccountId, (req, res) => {
  const id = req.params.id;
  accountsModel
    .getById(id)
    .then((account) => {
      res.json(account);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'error occurred' });
    });
});

router.post('/', checkAccountPayload, (req, res) => {
  accountsModel
    .create(req.body)
    .then((account) => {
      res.status(201).json(account);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'There was an error while saving the account' });
    });
});

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
