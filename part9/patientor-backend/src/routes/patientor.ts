import express from 'express'
import patients from '../../data/patient.json'

const router = express.Router()

router.get('/ping', (_req, res) => {
  res.json('hello world')
})

router.get('/patients', (_req, res) => {
  res.json(patients)
})

router.post('/patients', (req, res) => {
  return res.json({...req.body})
})

export default router
