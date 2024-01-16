import express from 'express'
import {calculateBmi} from './bmiCalculator'

const app = express()

app.get('/bmi', (req, res) => {
  console.log(req.query)
  const { height, weight } = req.query
  if (!height || !weight) res.json({error: "malformatted parameters"})
  res.json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight))
  })
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`port running in ${PORT}`)
})
