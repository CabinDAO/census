import { useUser } from '@/components/auth/useUser'
import { useModal } from '@/components/hooks/useModal'
import {
  MeFragment,
  GetProfileByIdFragment,
  CitizenshipStatus,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { Button } from '../../core/Button'
import Icon from '../../core/Icon'
import { VouchModal } from './VouchModal'
import styled from 'styled-components'

interface ProfileHeaderButtonProps {
  profile: MeFragment | GetProfileByIdFragment | undefined | null
  isOwnProfile?: boolean
}

export const ProfileHeaderButton = ({
  profile,
  isOwnProfile,
}: ProfileHeaderButtonProps) => {
  const router = useRouter()
  const { user } = useUser()
  const { showModal } = useModal()

  const handleProfileHeaderButtonClick = () => {
    if (isOwnProfile) {
      router.push(`/profile/${profile?._id}/edit`)
    } else if (profile) {
      showModal(() => (
        <VouchModal profile={profile as GetProfileByIdFragment} />
      ))
    }
  }
  if (isOwnProfile) {
    return (
      <StyledButton variant="tertiary" onClick={handleProfileHeaderButtonClick}>
        Edit Profile
      </StyledButton>
    )
  } else if (
    profile?.citizenshipStatus === CitizenshipStatus.VouchRequested &&
    user?.citizenshipStatus === CitizenshipStatus.Verified
  ) {
    return (
      <StyledButton
        variant="tertiary"
        onClick={handleProfileHeaderButtonClick}
        startAdornment={<Icon name="thumb-up" size={1.7} />}
      >
        Vouch
      </StyledButton>
    )
  } else {
    return null
  }
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bp.md} {
    margin-top: 0.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin-top: 0;
  }
`
