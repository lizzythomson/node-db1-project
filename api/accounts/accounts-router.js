const router = require('express').Router();

const accountsModel = require('./accounts-model');

const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
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

router.put('/:id', checkAccountId, checkAccountPayload, (req, res) => {
  const { id } = req.params;
  accountsModel
    .updateById(id, req.body)
    .then((updatedAccount) => {
      res.json(updatedAccount);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'There was an error while updating the accounts' });
    });
});

router.delete('/:id', checkAccountId, async (req, res) => {
  const { id } = req.params;
  const accountToDelete = await accountsModel.getById(id);
  accountsModel
    .deleteById(id)
    .then(() => {
      res.json(accountToDelete);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error deleting the user' });
    });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
