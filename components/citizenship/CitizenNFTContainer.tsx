import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { Caption, H3, Overline } from '../core/Typography'
import { HorizontalDivider } from '../core/Divider'
import { AutofitImage } from '../core/AutofitImage'
import { CitizenshipNFTPreviewData } from './CitizenshipNFTPreviewData'
import { CitizenshipNFTData } from './CitizenshipNFTData'
import { useGetUnlockNFT } from '../hooks/useGetUnlockNFT'
import { DEFAULT_NFT_IMAGE } from '@/utils/citizenship'
import Icon from '../core/Icon'
import { unlockConfig } from '@/lib/protocol-config'
import { shortenedAddress } from '@/utils/display-utils'
import { NFTDataList } from './NFTDataList'

export const CitizenNFTContainer = () => {
  const { activeNFT, loading } = useGetUnlockNFT()

  const imageSrc = activeNFT?.image || DEFAULT_NFT_IMAGE

  const contractData = {
    'Contract Address': {
      value: shortenedAddress(unlockConfig.contractAddress) ?? '',
      url: `https://${unlockConfig.networkName}.etherscan.io/address/${unlockConfig.contractAddress}`,
      external: true,
    },
    Blockchain: { value: unlockConfig.networkName ?? '' },
  }

  if (loading) {
    return null
  }

  return (
    <StyledContentCard shape="notch">
      <Section>
        <NFTContainer>
          <NftImage>
            <AutofitImage src={imageSrc} alt={'Unlock NFT'} />
          </NftImage>
        </NFTContainer>
        {activeNFT ? (
          <CitizenshipNFTData nft={activeNFT} />
        ) : (
          <CitizenshipNFTPreviewData />
        )}
      </Section>
      <HorizontalDivider />
      <Section>
        <DescriptionContainer>
          <H3>Description</H3>
          <Caption>
            Etiam interdum odio vel mi facilisis, ut luctus orci dictum. Aenean
            consequat libero eros. Vivamus sollicitudin vestibulum nisi, nec
            elementum augue pulvinar sit amet. Fusce dictum, urna ut
            pellentesque aliquet, nisi lacus aliquet lorem, eget pulvinar magna
            justo eu erat. Suspendisse vel scelerisque ante.
          </Caption>
          <StyledAnchor href={'/'} target="_blank" rel="noreferrer">
            <Overline>Learn More</Overline>
            <Icon name="up-right-arrow" size={0.9} />
          </StyledAnchor>
        </DescriptionContainer>
        <DescriptionContainer>
          <H3>Contract Information</H3>
          <NFTDataList
            fieldNames={Object.keys(contractData)}
            values={Object.values(contractData)}
          />
        </DescriptionContainer>
      </Section>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
`

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.4rem;
`

const NFTContainer = styled.div`
  display: flex;
  padding: 3rem;
  background: url('/images/nft-background.png');
  align-items: center;
  justify-content: center;
`

const NftImage = styled.div`
  position: relative;
  display: flex;
  border-radius: 0px 0px 64px 0px;
  width: 33.6rem;
  height: 33.6rem;
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  gap: 0.69rem;
  align-items: center;
  justify-content: flex-start;
`