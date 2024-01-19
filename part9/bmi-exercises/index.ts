import express from 'express'
import {calculateBmi} from './bmiCalculator'
import {calculateExercises} from './exerciseCalculator'

const app = express()

app.use(express.json())

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

app.post('/exercises', (req, res) => {
  console.log('req',req.body)
  const { daily_exercises, target } = req.body

  if (!daily_exercises || !target) {
    res.send({error: "parameters missing"}).status(400)
  }
  if (isNaN(Number(daily_exercises)) || isNaN(Number(daily_exercises))) {
     res.send({error: "malformatted parameters"}).status(400)
  }
  res.json(calculateExercises(daily_exercises, target))
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`port running in ${PORT}`)
})
