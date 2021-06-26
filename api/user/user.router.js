const { rawListeners } = require('../../config/database');
const {createUser,
     getUsersById,
      getUsers, 
      update, 
      deleteUser,
      login} = require('./user.controller');

const { checkToken } = require("../../auth/token_validation");
      
const router = require('express').Router();

router.post('/',  checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUsersById);
router.patch('/',  checkToken,update);
router.delete('/', checkToken, deleteUser);
router.post('/login',login);

module.exports = router;