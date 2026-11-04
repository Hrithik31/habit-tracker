import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registered successfully' }).send()
})

router.post('/login', (req, res) => {
  res.status(200).json({ message: 'User logged in successfully' }).send()
})

router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' }).send()
})

export default router
