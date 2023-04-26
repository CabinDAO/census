import {
  ProfileContactField,
  ProfileContactFieldType,
} from '@/generated/graphql'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

// Utility functions for displaying numbers compactly. e.g. 1000 -> 1k
const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

export const formatValue = (value: number): string => {
  const tier = (Math.log10(Math.abs(value)) / 3) | 0

  if (tier == 0) return value.toString()

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = value / scale

  return parseFloat(scaled.toFixed(2)) + suffix
}

export const pxToRem = (px: number) => `${px / 10}`

export const shortenedAddress = (address: string | undefined) =>
  address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null

export const formatDate = (date: Date, desiredFormat = 'MMMM yyyy') =>
  format(date, desiredFormat, { locale: enUS })

export const monthYearFormat = (dateISOString: string) =>
  format(new Date(dateISOString), 'MMMM yyyy', { locale: enUS })

export const formatContactField = (field: ProfileContactField) => {
  if (
    [
      ProfileContactFieldType.Lens,
      ProfileContactFieldType.Email,
      ProfileContactFieldType.Website,
    ].includes(field.type)
  ) {
    return field.value
  } else {
    return field.value.includes('@') ? field.value : `@${field.value}`
  }
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const truncate = (str: string, length: number) =>
  str.length > length ? `${str.substring(0, length)}...` : str
