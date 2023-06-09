import styled from 'styled-components'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { OfferType } from '@/generated/graphql'
import { useRouter } from 'next/router'
import { OfferTabList } from './OfferTabList'
import { ChipFilter, ChipFilterBar } from '../core/ChipFilterBar'

const SlugOfferTypeMap: Record<string, OfferType> = {
  coliving: OfferType.PaidColiving,
  residency: OfferType.Residency,
  'build-week': OfferType.BuildAndGrowWeek,
}

export const OfferDirectoryView = () => {
  const router = useRouter()
  const { offerTypeSlug } = router.query
  const offerType = SlugOfferTypeMap[offerTypeSlug as string] || null

  return (
    <SingleColumnLayout>
      <TitleCard icon="offer" title="Experiences" />
      <Content>
        <StyledChipFilterBar>
          <ChipFilter
            label="All"
            selected={!offerType}
            onClick={() => router.push('/experiences')}
          />
          <ChipFilter
            label="Coliving"
            selected={offerType === OfferType.PaidColiving}
            onClick={() => router.push('/experiences/coliving')}
          />
          <ChipFilter
            label="Residencies"
            selected={offerType === OfferType.Residency}
            onClick={() => router.push('/experiences/residency')}
          />
          <ChipFilter
            label="Build Week"
            selected={offerType === OfferType.BuildAndGrowWeek}
            onClick={() => router.push('/experiences/build-week')}
          />
        </StyledChipFilterBar>
        <OfferTabList offerType={offerType} />
      </Content>
    </SingleColumnLayout>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`

const StyledChipFilterBar = styled(ChipFilterBar)`
  border-bottom: none;
`
