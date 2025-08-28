const express = require('express')

const {
  createWallet,
  fundWallet
} = require('../controllers/walletController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all wallet routes
router.use(requireAuth)

// POST a new wallet
router.post('/', createWallet)

// UPDATE a wallet
router.patch('/', fundWallet)

module.exports = router