import styled from 'styled-components'
import { InputText } from '../core/InputText'
import { InputTextArea } from '../core/InputTextArea'
import { MAX_BIO_LENGTH, MAX_LOCATION_LENGTH } from './constants'

interface AboutInputProps {
  bio: string
  location: string
  onBioChange: (bio: string) => void
  onLocationChange: (location: string) => void
}

export const AboutInput = ({
  bio,
  location,
  onBioChange,
  onLocationChange,
}: AboutInputProps) => {
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_BIO_LENGTH) return
    onBioChange(e.target.value)
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LOCATION_LENGTH) return
    onLocationChange(e.target.value)
  }

  return (
    <SetupStepContainer>
      <StyledInputTextArea
        label="Bio"
        helperText={`${bio.length}/${MAX_BIO_LENGTH}`}
        value={bio}
        onChange={handleBioChange}
      />
      <InputText
        label="Location"
        helperText={`${location.length}/${MAX_LOCATION_LENGTH}`}
        value={location}
        onChange={handleLocationChange}
      />
    </SetupStepContainer>
  )
}

const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`

const StyledInputTextArea = styled(InputTextArea)`
  height: 15.2rem;
`
