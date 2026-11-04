import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'List of users' }).send()
})

router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ message: `User with id ${req.params.id}` })
    .send()
})

router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ message: `User with id ${req.params.id} updated successfully` })
    .send()
})

router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ message: `User with id ${req.params.id} deleted successfully` })
    .send()
})

export default router
