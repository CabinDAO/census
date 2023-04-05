import { MONTHLY_PRICE_IN_USD, UnlockNFT } from '@/utils/citizenship'
import { formatDate } from '@/utils/display-utils'
import styled from 'styled-components'
import { useUser } from '../auth/useUser'
import { Button } from '../core/Button'
import { H3, H1 } from '../core/Typography'
import { NFTDataList } from './NFTDataList'

interface CitizenshipNFTDataProps {
  nft?: UnlockNFT
}

export const CitizenshipNFTData = ({ nft }: CitizenshipNFTDataProps) => {
  const { user } = useUser()

  const handleMint = () => {
    // TODO: Uncomment when citizenship minting is enabled
    // window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  if (!user || !nft) return null

  let nftData = {}

  const expiredNft = nft.expirationDate < new Date()

  const vouchedBy = user?.receivedVouches?.data[0]?.voucher

  nftData = {
    'Vouched for by': {
      value: vouchedBy?.name || '',
      url: `/profile/${vouchedBy?._id}`,
    },
    Type: { value: 'Cabin Citizenship' },
    Status: { value: expiredNft ? 'Expired' : user.citizenshipStatus },
    Created: { value: formatDate(nft.mintedDate, 'MMM dd, yyyy') },
    Expires: {
      value: formatDate(nft.expirationDate, 'MMM dd, yyyy'),
    },
    'Renewal Price': { value: `$${MONTHLY_PRICE_IN_USD * 12}/year` },
  }

  return (
    <Container>
      <H1>Cabin Citizen #{nft?.tokenId}</H1>
      <DetailsContainer>
        <H3>Details</H3>
        <NFTDataList data={nftData} />
      </DetailsContainer>
      <UnlockCTAButton variant="secondary" onClick={handleMint}>
        {expiredNft ? 'Renew now' : 'Cancel citizenship'}
      </UnlockCTAButton>
    </Container>
  )
}

const UnlockCTAButton = styled(Button)`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2.4rem;
  width: 100%;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  width: 100%;
`
