const height = Number(process.argv[2])
const weight = Number(process.argv[3])

export function calculateBmi(height: number, weight: number): string {
  const BMI = weight / (height / 100) ** 2
  if (BMI < 16) {
    return 'Underweight'
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    return 'Normal'
  } else if (BMI >= 25 && BMI <= 29.9) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

console.log(calculateBmi(height, weight))
