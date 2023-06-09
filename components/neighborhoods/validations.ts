import {
  OfferType,
  PartialUpdateLocationInput,
  UpdateOfferInput,
} from '@/generated/graphql'
import { MAX_LOCATION_TITLE_LENGTH, MAX_LOCATION_BIO_LENGTH } from './constants'
import {
  EMAIL_VALID_REGEX,
  INVALID_FIELD_ERROR,
  REQUIRED_FIELD_ERROR,
  isNumber,
  truthyString,
} from '@/utils/validate'
import { emptyEditorValue } from '../core/slate/slate-utils'

export type ValidationType = 'missing' | 'invalid' | 'valid'

type ValidationResult = {
  error: string
  valid: boolean
}

export const validateLocationInput = (
  editProfileInput: PartialUpdateLocationInput
) => {
  const {
    name,
    tagline,
    description,
    caretakerEmail,
    address,
    sleepCapacity,
    internetSpeedMbps,
  } = editProfileInput

  const invalid =
    (editProfileInput.hasOwnProperty('name') && !validateTitle(name).valid) ||
    (editProfileInput.hasOwnProperty('tagline') &&
      !validateBio(tagline).valid) ||
    (editProfileInput.hasOwnProperty('description') &&
      !validateBio(description).valid) ||
    (editProfileInput.hasOwnProperty('caretakerEmail') &&
      !validateEmail(caretakerEmail).valid) ||
    (editProfileInput.hasOwnProperty('address') &&
      !truthyString(address?.formattedAddress)) ||
    (editProfileInput.hasOwnProperty('internetSpeedMbps') &&
      !isNumber(internetSpeedMbps)) ||
    (editProfileInput.hasOwnProperty('sleepCapacity') &&
      !isNumber(sleepCapacity))

  return !invalid
}

export const validateOfferInput = (
  offerInput: UpdateOfferInput,
  offerType: OfferType
) => {
  const { title, description, applicationUrl, price, imageIpfsHash } =
    offerInput

  const invalid =
    !validateTitle(title).valid ||
    emptyEditorValue(description) ||
    (offerInput.hasOwnProperty('applicationUrl') &&
      !truthyString(applicationUrl)) ||
    (offerType === OfferType.PaidColiving &&
      offerInput.hasOwnProperty('price') &&
      !isNumber(price?.amountCents)) ||
    (offerInput.hasOwnProperty('imageIpfsHash') && !truthyString(imageIpfsHash))

  return !invalid
}

type ConditionalString = string | undefined | null

export const validateTitle = (name: ConditionalString): ValidationResult => {
  if (!truthyString(name)) {
    return {
      error: REQUIRED_FIELD_ERROR,
      valid: false,
    }
  } else if ((name?.length ?? 0) > MAX_LOCATION_TITLE_LENGTH) {
    return {
      error: INVALID_FIELD_ERROR,
      valid: false,
    }
  } else {
    return {
      error: '',
      valid: true,
    }
  }
}

export const validateBio = (description: ConditionalString) => {
  if (!truthyString(description)) {
    return {
      error: REQUIRED_FIELD_ERROR,
      valid: false,
    }
  } else if ((description?.length ?? 0) > MAX_LOCATION_BIO_LENGTH) {
    return {
      error: INVALID_FIELD_ERROR,
      valid: false,
    }
  } else {
    return {
      error: '',
      valid: true,
    }
  }
}

export const validateEmail = (email: ConditionalString) => {
  if (!truthyString(email)) {
    return {
      error: REQUIRED_FIELD_ERROR,
      valid: false,
    }
  } else if (!email?.match(EMAIL_VALID_REGEX)) {
    return {
      error: INVALID_FIELD_ERROR,
      valid: false,
    }
  } else {
    return {
      error: '',
      valid: true,
    }
  }
}
