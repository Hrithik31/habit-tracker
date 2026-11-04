import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'List of habits' }).send()
})

router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ message: `Habit with id ${req.params.id}` })
    .send()
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Habit created successfully' }).send()
})

router.post('/:id/complete', (req, res) => {
  res
    .status(200)
    .json({ message: `Habit with id ${req.params.id} marked as complete` })
    .send()
})

router.patch('/:id', (req, res) => {
  res
    .status(200)
    .json({ message: `Habit with id ${req.params.id} updated successfully` })
    .send()
})

router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ message: `Habit with id ${req.params.id} deleted successfully` })
    .send()
})

export default router
