import express from 'express'
import { signUp, logIn } from './controllers/AuthController.js'

const router = express.Router()

router.use('/auth', signUp)
router.use('/auth', logIn)

export default router