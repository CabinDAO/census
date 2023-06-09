import {
  ProfileContactField,
  ProfileContactFieldType,
} from '@/generated/graphql'
import { format, getYear, getMonth } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const appDomain =
  process.env.NEXT_PUBLIC_APP_ENV === 'prod'
    ? 'cabin.city'
    : process.env.NEXT_PUBLIC_VERCEL_URL

export const EMPTY = '—'

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

export const remToPx = (rem: number) => `${rem * 10}`

export const shortenedAddress = (address: string | undefined) =>
  address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null

export const shortenedContactField = (value: string | undefined) => {
  if (!value) return null

  return value.length > 23
    ? `${value.slice(0, 20)}...${value.slice(-1)}`
    : value
}
export const formatDate = (
  date: Date,
  desiredFormat = 'MMMM yyyy',
  placeholder?: string
) => (date ? format(date, desiredFormat, { locale: enUS }) : placeholder)

export const monthYearFormat = (dateISOString: string) =>
  format(new Date(dateISOString), 'MMMM yyyy', { locale: enUS })

export const formatUrl = (url?: string | undefined | null) => {
  if (!url) return null

  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`
}

const contactFieldTypeUrlMap: Partial<Record<ProfileContactFieldType, string>> =
  {
    [ProfileContactFieldType.Email]: 'mailto:',
    [ProfileContactFieldType.Website]: '',
    [ProfileContactFieldType.Twitter]: 'https://twitter.com/',
    [ProfileContactFieldType.Telegram]: 'https://t.me/',
    [ProfileContactFieldType.Instagram]: 'https://instagram.com/',
    [ProfileContactFieldType.LinkedIn]: 'https://linkedin.com/in/',
    [ProfileContactFieldType.Lens]: 'https://lenster.xyz/u/',
  }

export const getUrlFromContactField = (field: ProfileContactField) => {
  const keys = Object.keys(contactFieldTypeUrlMap) as ProfileContactFieldType[]

  if (field.type === ProfileContactFieldType.Website) {
    return formatUrl(field.value)
  }

  if (keys.includes(field.type)) {
    if (
      !!contactFieldTypeUrlMap[field.type] &&
      field.value.includes(contactFieldTypeUrlMap[field.type] as string)
    ) {
      return field.value
    }

    return `${contactFieldTypeUrlMap[field.type]}${field.value}`
  } else {
    return null
  }
}

export const formatContactField = (
  field: ProfileContactField,
  truncateValue = false
) => {
  const shortenedValue = truncateValue
    ? shortenedContactField(field.value)
    : field.value

  if (ProfileContactFieldType.Lens) {
    const lensUrl = 'https://lenster.xyz/u/'

    if (field.value.startsWith(lensUrl)) {
      return field.value.slice(lensUrl.length)
    } else {
      return shortenedValue
    }
  }
  if (
    [ProfileContactFieldType.Email, ProfileContactFieldType.Website].includes(
      field.type
    )
  ) {
    return shortenedValue
  } else {
    shortenedValue?.startsWith('@') ? shortenedValue : `@${shortenedValue}`
  }
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const truncate = (str: string, length: number) =>
  str.length > length ? `${str.substring(0, length)}...` : str

export const formatRange = (startDate?: Date | null, endDate?: Date | null) => {
  if (!startDate || !endDate) return `${EMPTY} - ${EMPTY}`

  // Within same year
  if (getYear(startDate) === getYear(endDate)) {
    // Within same month
    if (getMonth(startDate) === getMonth(endDate)) {
      // Within same day
      if (startDate.getDate() === endDate.getDate()) {
        return formatDate(startDate, 'MMM d', EMPTY)
      } else {
        return `${formatDate(startDate, 'MMM d', EMPTY)} - ${formatDate(
          endDate,
          'd',
          EMPTY
        )}`
      }
    } else {
      return `${formatDate(startDate, 'MMM d', EMPTY)} - ${formatDate(
        endDate,
        'MMM d',
        EMPTY
      )}`
    }
  } else {
    return `${formatDate(startDate, 'MMM d, yyyy', EMPTY)} - ${formatDate(
      endDate,
      'MMM d, yyyy',
      EMPTY
    )}`
  }
}

export const centsToUSD = (cents: number) => Math.round(cents / 100)
