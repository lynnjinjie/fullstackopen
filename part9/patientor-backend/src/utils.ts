import { NewPatient, Gender } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing Name");
  }
  return name
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing Occupation");
  }
  return occupation
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing Ssn");
  }
  return ssn
}

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing DateOfBirth");
  }
  return date
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing Gender:" + gender)
  }
  return gender
}

type Fields = { name: unknown, occupation: unknown, ssn: unknown, gender: unknown, dateOfBirth: unknown }
export default function toNewPatient({ name, occupation, ssn, gender, dateOfBirth }: Fields): NewPatient {
  const newPatient: NewPatient = {
    name: parseName(name),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    dateOfBirth: parseDateOfBirth(dateOfBirth)
  }
  return newPatient
}
