const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
}

// new types
interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal'
  description: string
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission'
  description: string
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartBase {
  type: 'special'
  description: string
  requirements: string[]
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart

const Content = ({ parts }: { parts: CoursePart[] }) => {
  const findType = (part: CoursePart) => {
    switch (part.type) {
      case 'normal':
        return <i>{part.description}</i>
        break
      case 'groupProject':
        return <p>project exercises {part.groupProjectCount}</p>
        break
      case 'submission':
        return (
          <>
            <i>{part.description}</i>
            <p>submit to {part.exerciseSubmissionLink}</p>
          </>
        )
      case 'special':
        return (
          <>
            <i>{part.description}</i>
            <p>
              required skills:
              {part.requirements.map((req: string, index: number) => {
                return <span key={index}>{req}</span>
              })}
            </p>
          </>
        )
      default:
        break
    }
  }

  return (
    <>
      {parts.map((item: CoursePart, index: number) => {
        return (
          <p key={index}>
            <h3>
              {item.name} {item.exerciseCount}{' '}
            </h3>
            {findType(item)}
          </p>
        )
      })}
    </>
  )
}

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = 'Half Stack application development'

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
}

export default App
