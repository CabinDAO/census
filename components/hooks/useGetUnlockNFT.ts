import { DEFAULT_NFT_IMAGE, UnlockNFT } from '@/utils/citizenship'
import { useEffect, useState } from 'react'
import { useProfile } from '../auth/useProfile'
import { usePublicLockContract } from './usePublicLockContract'
import { BigNumber } from 'ethers'

export const useGetUnlockNFT = () => {
  const publicLockContract = usePublicLockContract()
  const [activeNFT, setActiveNFT] = useState<UnlockNFT | null>(null)
  const [loading, setLoading] = useState(false)
  const { user: profile } = useProfile()

  const getDateFromBigNumber = (bigNumber: BigNumber) => {
    try {
      const date = new Date(bigNumber.toNumber() * 1000)
      return date
    } catch (error) {
      // Example invalid date: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
      console.error('Invalid date', error)
      return null
    }
  }

  useEffect(() => {
    const getNFT = async () => {
      if (
        !publicLockContract ||
        !profile?.account?.address ||
        !profile.citizenshipMetadata
      ) {
        setLoading(false)
        return
      }

      setLoading(true)
      const nft = await publicLockContract.getHasValidKey(
        profile.account.address
      )

      if (nft) {
        const tokenId = await publicLockContract.tokenOfOwnerByIndex(
          profile.account.address,
          0
        )

        const expirationTimestamp =
          await publicLockContract.keyExpirationTimestampFor(tokenId)

        setActiveNFT({
          tokenId: tokenId.toString(),
          mintedDate: new Date(profile.citizenshipMetadata.mintedAt),
          expirationDate: getDateFromBigNumber(expirationTimestamp),
          image: DEFAULT_NFT_IMAGE,
        })
      }
      setLoading(false)
    }

    getNFT()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  return { activeNFT, loading }
}
