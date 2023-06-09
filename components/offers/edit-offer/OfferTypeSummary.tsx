import styled from 'styled-components'
import { OfferType } from '@/generated/graphql'
import { Body2, Subline1 } from '@/components/core/Typography'

interface OfferTypeSummaryProps {
  offerType: OfferType | null | undefined
}

interface OfferTypeDescription {
  title: string
  paragraphs: string[]
}

const offerTypeDescriptionMap: Record<OfferType, OfferTypeDescription> = {
  [OfferType.PaidColiving]: {
    title: 'Colive Offer',
    paragraphs: [
      'Invite people to apply to stay at your location for short-term residence. This offer type will be only available to Cabin Citizens.',
    ],
  },
  [OfferType.Residency]: {
    title: 'Residency Offer',
    paragraphs: [
      'Support creatives by offering short-term stays where they can work uninterrupted on a personal project.',
    ],
  },
  [OfferType.BuildAndGrowWeek]: {
    title: 'Build Week Offer',
    paragraphs: [
      'Plan and build out your property with the help of the community. These can be short-term project initiatives on location for community members to participate in for free room and board.',
    ],
  },
}

export const OfferTypeSummary = ({ offerType }: OfferTypeSummaryProps) => {
  if (!offerType) {
    return null
  }

  const config = offerTypeDescriptionMap[offerType]

  return (
    <SummaryContainer>
      <Subline1>{config.title}</Subline1>
      <Description>
        {config.paragraphs.map((paragraph) => (
          <Body2 key={paragraph}>{paragraph}</Body2>
        ))}
      </Description>
    </SummaryContainer>
  )
}

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
