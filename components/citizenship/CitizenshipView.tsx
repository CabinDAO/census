import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import { CitizenshipStatus, useToggleSignalMutation } from '@/generated/graphql'
import { CitizenshipStatusBar } from './CitizenshipStatusBar'
import { CitizenNFTContainer } from './CitizenNFTContainer'
import { useAccount } from 'wagmi'
import { loadUnlockCheckout } from './UnlockScript'
import { unlockConfig } from '@/lib/protocol-config'
import { MINIMUM_CABIN_BALANCE } from '@/utils/citizenship'

export const CitizenshipView = () => {
  const { user } = useUser({ redirectTo: '/' })
  const { connector } = useAccount()

  const [toggleSignal] = useToggleSignalMutation()

  const handleMint = async () => {
    if (!connector) return

    const provider = await connector.getProvider({
      chainId: unlockConfig.chainId,
    })

    loadUnlockCheckout(provider)
  }

  const handleToggleSignal = () => {
    if (!user) return

    toggleSignal()
  }

  if (!user) return null

  return (
    <SingleColumnLayout>
      <TitleCard
        title="Citizenship"
        icon="back-arrow"
        iconHref={`/profile/${user._id}`}
      />

      {user && user?.citizenshipStatus !== CitizenshipStatus.Verified && (
        <CitizenshipStatusBar
          onMint={handleMint}
          onSignal={handleToggleSignal}
          status={user?.citizenshipStatus}
          approvedDueToCabinBalance={
            user?.cabinTokenBalanceInt >= MINIMUM_CABIN_BALANCE
          }
        />
      )}
      <CitizenNFTContainer />
    </SingleColumnLayout>
  )
}
