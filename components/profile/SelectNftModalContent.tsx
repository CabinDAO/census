import { ModalContent } from '../core/modals/ModalContent'
import { ModalExplainer } from '../core/modals/ModalExplainer'
import { Caption } from '../core/Typography'
import { SearchNft } from './SearchNft'
import styled from 'styled-components'
import { OwnedNft } from 'alchemy-sdk'

interface SelectNftModalContentProps {
  nfts: OwnedNft[] | null
  aboutOpen: boolean
  onSelect: (nft: OwnedNft) => void
}

const AboutExplainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

export const SelectNftModalContent = ({
  nfts,
  aboutOpen,
  onSelect,
}: SelectNftModalContentProps) => {
  if (aboutOpen) {
    const explanation = (
      <AboutExplainer>
        <Caption>
          An NFT is a unique digital asset that can represent ownership or proof
          of authenticity of a specific item, such as artwork. They can be
          acquired from various NFT marketplaces that operate on the blockchain.
        </Caption>
        <Caption>
          Cabin let&#39;s you select NFTs in your connected wallet to set as
          your profile picture.
        </Caption>
      </AboutExplainer>
    )

    return (
      <ModalExplainer
        title="Set an NFT you own as your avatar"
        explanation={explanation}
      />
    )
  } else if (nfts?.length === 0) {
    const explanation = (
      <Caption>
        Pieces that you own will be shown here for you to select. NFTs can be
        acquired from various NFT marketplaces like OpenSea, Zora, Rarible,
        SuperRare, and Nifty Gateway.
      </Caption>
    )
    return (
      <ModalExplainer
        title="Your connected wallet doesn’t have any assets"
        explanation={explanation}
      />
    )
  } else if (!!nfts) {
    return (
      <ModalContent>
        <SearchNft onSelect={onSelect} nfts={nfts} />
      </ModalContent>
    )
  }

  return null
}
