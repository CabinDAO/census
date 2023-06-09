import { Dropdown } from '@/components/core/Dropdown'
import { InputText } from '@/components/core/InputText'
import { H3 } from '@/components/core/Typography'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import {
  OfferPrice,
  OfferPriceUnit,
  PartialUpdateOfferPriceInput,
} from '@/generated/graphql'
import { labelByOfferPriceUnit } from '@/utils/offer'
import { REQUIRED_FIELD_ERROR } from '@/utils/validate'
import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { Pair } from './EditOfferForm'

const options = Object.values(OfferPriceUnit).map((unit) => ({
  label: labelByOfferPriceUnit(unit),
  value: unit,
}))

interface PricingProps {
  price?: OfferPrice | PartialUpdateOfferPriceInput | null
  onPriceChange?: (value: OfferPrice) => void
  highlightErrors?: boolean
}

export const Pricing = ({
  price,
  onPriceChange,
  highlightErrors,
}: PricingProps) => {
  const amountCents = price?.amountCents ?? 0

  const handlePriceChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let parsedValue = 0

    if (e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }

    if (onPriceChange) {
      onPriceChange({
        amountCents: (parsedValue * 100) as number,
        unit: price?.unit as OfferPriceUnit,
      })
    }
  }

  const handlePriceUnitSelect = (option: SelectOption) => {
    if (onPriceChange) {
      onPriceChange({
        amountCents: price?.amountCents as number,
        unit: option.value as OfferPriceUnit,
      })
    }
  }

  return (
    <Pair>
      <H3>Pricing</H3>
      <InputPair>
        <InputText
          required
          placeholder="$ Value"
          label="Price"
          onChange={handlePriceChange}
          value={price && amountCents > 0 ? (amountCents / 100).toString() : ''}
          error={highlightErrors && !price?.amountCents}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
        <Dropdown
          label="Unit"
          required
          options={options}
          onSelect={handlePriceUnitSelect}
          selectedOption={
            options.find((option) => option.value === price?.unit) ?? options[0]
          }
        />
      </InputPair>
    </Pair>
  )
}

const InputPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.8rem;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`
