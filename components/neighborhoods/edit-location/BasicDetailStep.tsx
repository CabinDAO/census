import { LocationStepWrapper } from './LocationStepWrapper'
import {
  Subline2,
  h4Styles,
  subline2Styles,
} from '@/components/core/Typography'
import styled from 'styled-components'
import { StepProps } from './location-wizard-configuration'
import { useUpdateLocation } from '../useUpdateLocation'
import { InputText } from '@/components/core/InputText'
import {
  MAX_LOCATION_BIO_LENGTH,
  MAX_LOCATION_TITLE_LENGTH,
} from '../constants'
import {
  LocationAddressInput,
  PartialUpdateLocationInput,
  useGetProfileByAddressLazyQuery,
  useGetProfilesLazyQuery,
} from '@/generated/graphql'
import { useEffect, useState } from 'react'
import { HorizontalDivider } from '@/components/core/Divider'
import {
  validateBio,
  validateEmail,
  validateLocationInput,
  validateTitle,
} from '../validations'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { Dropdown } from '@/components/core/Dropdown'
import { resolveAddressOrName } from '@/lib/ens'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { isNotNull } from '@/lib/data'
import {
  REQUIRED_FIELDS_TOAST_ERROR,
  REQUIRED_FIELD_ERROR,
  isNumber,
  truthyString,
} from '@/utils/validate'
import { useError } from '@/components/hooks/useError'

export const BasicDetailStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location._id)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...currentAddress } = location?.address ?? {}

  const [address, setAddress] = useState<LocationAddressInput | null>(
    currentAddress ?? {}
  )

  const [highlightErrors, setHighlightErrors] = useState(false)

  const { showError } = useError()

  useEffect(() => {
    if (location.referrer) {
      const option: SelectOption = {
        label: location.referrer.name,
        value: location.referrer._id,
        imageSrc: location.referrer.avatar?.url,
      }

      setOptions([option])
      setSelectedOption(option)
    }
  }, [location.referrer])

  const [searchProfiles] = useGetProfilesLazyQuery({})
  const [getProfileByAddress] = useGetProfileByAddressLazyQuery()
  const [options, setOptions] = useState<SelectOption[]>([])
  const [searching, setSearching] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(undefined)

  const [locationInput, setLocationInput] =
    useState<PartialUpdateLocationInput>({
      name: location.name,
      caretakerEmail: location.caretakerEmail,
      tagline: location.tagline,
      sleepCapacity: location.sleepCapacity,
      internetSpeedMbps: location.internetSpeedMbps,
    })

  const nameValidation = validateTitle(locationInput.name)
  const contactEmailValidation = validateEmail(locationInput.caretakerEmail)
  const shortBioValidation = validateBio(locationInput.tagline)

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PartialUpdateLocationInput
  ) => {
    const intFields = ['sleepCapacity', 'internetSpeedMbps']

    let parsedValue = 0

    if (intFields.includes(field) && e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }

    if (field === 'name') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_TITLE_LENGTH),
      }))
      return
    } else if (field === 'tagline') {
      setLocationInput((prev) => ({
        ...prev,
        [field]: e.target.value.slice(0, MAX_LOCATION_BIO_LENGTH),
      }))
      return
    }

    setLocationInput((prev) => ({
      ...prev,
      [field]:
        intFields.includes(field) && e.target.value !== ''
          ? parsedValue
          : e.target.value,
    }))
  }

  const handleLocationChange = (value: LocationAddressInput) => {
    // Nullify undefined values so that they are deleted from DB
    Object.keys(value).forEach((key) => {
      if (!value[key as keyof LocationAddressInput]) {
        value[key as keyof LocationAddressInput] = null
      }
    })

    setAddress(value)
  }

  const handleNext = async () => {
    if (validateLocationInput(locationInput)) {
      await updateLocation({ ...locationInput, address })
      onNext()
    } else {
      setHighlightErrors(true)
      showError(REQUIRED_FIELDS_TOAST_ERROR)
    }
  }

  const handleSearch = async (value: string) => {
    setSearching(true)
    const resolvedAddress = await resolveAddressOrName(value)
    if (resolvedAddress) {
      const result = await getProfileByAddress({
        variables: { address: resolvedAddress },
      })
      if (
        result.data?.accountByAddress?.profile &&
        result.data?.accountByAddress?.profile?._id !== location.caretaker._id
      ) {
        setOptions([
          {
            label: result.data.accountByAddress.profile.name,
            value: result.data.accountByAddress.profile._id,
            imageSrc:
              result.data.accountByAddress.profile?.avatar?.url ??
              '/images/default-avatar.png',
          },
        ])
      }
    } else {
      const result = await searchProfiles({
        variables: {
          input: {
            searchQuery: value,
            roleTypes: [],
            levelTypes: [],
            citizenshipStatuses: [],
          },
          size: 3,
        },
      })

      if (result.data?.getProfiles?.data) {
        setOptions(
          result.data?.getProfiles?.data
            .filter(isNotNull)
            .map((profile) => ({
              label: profile?.name,
              value: profile?._id,
              imageSrc: profile?.avatar?.url ?? '/images/default-avatar.png',
            }))
            .filter((option) => option.value !== location.caretaker._id)
        )
      }
    }
  }

  const handleOnSelect = (option: SelectOption) => {
    setSelectedOption(option)

    setSearching(false)

    if (option.value) {
      setLocationInput((prev) => ({
        ...prev,
        referrer: {
          connect: option.value.toLocaleString(),
        },
      }))
    }
  }

  return (
    <StyledLocationStepWrapper
      name={name}
      onNext={handleNext}
      onBack={onBack}
      steps={steps}
    >
      <InputCoupleContainer>
        <InputText
          required
          value={locationInput.name ?? ''}
          onChange={(event) => handleOnChange(event, 'name')}
          helperText={`${
            locationInput.name?.length ?? 0
          }/${MAX_LOCATION_TITLE_LENGTH}`}
          label="Listing title"
          placeholder="Title"
          error={highlightErrors && !nameValidation.valid}
          errorMessage={nameValidation.error}
        />
      </InputCoupleContainer>
      <InputCoupleContainer>
        <InputText
          placeholder={location.caretaker.name ?? ''}
          label="Caretaker"
          disabled
        />
        <InputText
          required
          value={locationInput.caretakerEmail ?? ''}
          onChange={(event) => handleOnChange(event, 'caretakerEmail')}
          label="Contact email"
          placeholder="Email"
          error={highlightErrors && !contactEmailValidation.valid}
          errorMessage={contactEmailValidation.error}
        />
      </InputCoupleContainer>
      <FullWidthInputContainer>
        <InputText
          required
          value={locationInput.tagline ?? ''}
          onChange={(event) => handleOnChange(event, 'tagline')}
          helperText={`${
            locationInput.tagline?.length ?? 0
          }/${MAX_LOCATION_BIO_LENGTH}`}
          label="Short bio"
          placeholder="1 sentence description of your property"
          error={highlightErrors && !shortBioValidation.valid}
          errorMessage={shortBioValidation.error}
        />
      </FullWidthInputContainer>
      <FullWidthInputContainer>
        <LocationAutocompleteInput
          onLocationChange={handleLocationChange}
          initialValue={address}
          error={highlightErrors && !truthyString(address?.formattedAddress)}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
      </FullWidthInputContainer>
      <InputCoupleContainer>
        <InputText
          required
          value={locationInput.sleepCapacity ?? ''}
          onChange={(event) => handleOnChange(event, 'sleepCapacity')}
          label="Number of beds"
          placeholder="Value"
          error={highlightErrors && !isNumber(locationInput.sleepCapacity)}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
        <InputText
          required
          value={locationInput.internetSpeedMbps ?? ''}
          onChange={(event) => handleOnChange(event, 'internetSpeedMbps')}
          label="Average internet speed"
          placeholder="Value"
          endAdornment={<Subline2 style={{ opacity: '0.5' }}>Mbps</Subline2>}
          error={highlightErrors && !isNumber(locationInput.internetSpeedMbps)}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
      </InputCoupleContainer>
      <HorizontalDivider />
      <InputCoupleContainer>
        <StyledDropdown
          searching={searching}
          enableSearch
          onSearch={handleSearch}
          label="Did someone at Cabin refer you?"
          placeholder="Name"
          options={options}
          selectedOption={selectedOption}
          onSelect={handleOnSelect}
        />
      </InputCoupleContainer>
    </StyledLocationStepWrapper>
  )
}

interface InputContainerProps {
  fullWidth?: boolean
}

interface StyledDropdownProps {
  searching?: boolean
}

const StyledDropdown = styled(Dropdown)<StyledDropdownProps>`
  ${Subline2} {
    ${h4Styles}
  }

  input {
    ${({ searching }) => (searching ? subline2Styles : h4Styles)}
  }
`

const StyledLocationStepWrapper = styled(LocationStepWrapper)`
  min-height: calc(100vh - 4.8rem);
`

const InputCoupleContainer = styled.div<InputContainerProps>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
  }
`

const FullWidthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
