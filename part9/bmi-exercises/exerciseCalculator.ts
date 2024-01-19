interface CalculateExercises {
  periodLength: number,
  trainingDays: number,
  average: number,
  target: number,
  ratingDescription: string,
  rating: number
}


export function calculateExercises(time_list: number[], target: number): CalculateExercises {
  const periodLength = time_list.length
  const trainingDays = time_list.filter(item => item !== 0).length
  const average = time_list.reduce((acc, item) =>  acc += item, 0) / periodLength
  const ratingDescription = 'not too bad but could be better'
  const rating = 2
  return {
    periodLength,
    trainingDays,
    average,
    target,
    ratingDescription,
    rating
  }
}

const arr:number[] = []
process.argv.slice(2).forEach((item) => {
  arr.push(Number(item))
})

const pr = calculateExercises(arr, 2)
console.log('pr',pr)
