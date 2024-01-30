import express from 'express'
import patients from '../../data/patient.json'
import toNewPatient from '../utils'
import { v1 as uuid } from 'uuid'

const router = express.Router()

router.get('/ping', (_req, res) => {
  res.json('hello world')
})

router.get('/patients', (_req, res) => {
  res.json(patients)
})

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    
    res.json({
      id: uuid(),
      ...newPatient
    })
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`
    }
    res.status(400).send(errorMessage)
  }
})

export default router
