import { useState } from 'react'
import { LocationStepWrapper } from './LocationStepWrapper'
import { Body2 } from '@/components/core/Typography'
import { StepProps } from './location-wizard-configuration'
import styled from 'styled-components'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { PartialUpdateLocationInput } from '@/generated/graphql'
import { Descendant } from 'slate'
import { useUpdateLocation } from '../useUpdateLocation'

export const DescriptionStep = ({
  name,
  onBack,
  onNext,
  location,
  steps,
}: StepProps) => {
  const { updateLocation } = useUpdateLocation(location._id)
  const [locationInput, setLocationInput] =
    useState<PartialUpdateLocationInput>({
      description: location.description,
    })

  const handleNext = async () => {
    await updateLocation(locationInput)
    onNext()
  }

  const slateProps = locationInput?.description
    ? { value: JSON.parse(locationInput.description) }
    : {}

  const handleEditorChange = (val: Descendant[]) => {
    setLocationInput({ ...locationInput, description: JSON.stringify(val) })
  }

  return (
    <LocationStepWrapper
      name={name}
      onNext={handleNext}
      onBack={onBack}
      steps={steps}
    >
      <StyledBody2>
        Get specific, but be clear and brief. Describe what makes it attractive
        to a resident, a little about the location, and any special amenities.
      </StyledBody2>
      <EditorContainer>
        <SlateEditor
          {...slateProps}
          placeholder="Share a description of your neighborhood here"
          onChange={handleEditorChange}
        />
      </EditorContainer>
    </LocationStepWrapper>
  )
}

const StyledBody2 = styled(Body2)`
  width: 100%;
  align-self: flex-start;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
