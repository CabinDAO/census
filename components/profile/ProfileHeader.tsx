import { GetProfileByIdFragment } from '@/generated/graphql'
import { shortenedAddress } from '@/utils/display-utils'
import styled from 'styled-components'
import { Avatar } from '../core/Avatar'
import { ContentCard } from '../core/ContentCard'
import { CopyText } from '../core/CopyToClipboard'
import { H1, Subline2 } from '../core/Typography'
import useEns from '../hooks/useEns'
import { ProfileHeaderButton } from './ProfileHeaderButton'

interface ProfileHeaderProps {
  profile: GetProfileByIdFragment | undefined | null
  isOwnProfile?: boolean
}

export const ProfileHeader = ({
  profile,
  isOwnProfile = false,
}: ProfileHeaderProps) => {
  const { ens } = useEns(profile?.account?.address)
  return (
    <ContentCard shadow>
      <Container>
        <ProfileSummary>
          <Avatar size={8.8} src={profile?.avatar?.url} />
          <ProfileInfoContainer>
            <H1>{profile?.name}</H1>
            <BalanceAddressContainer>
              <Subline2>{`${
                profile?.account?.cabinTokenBalance ?? 0
              } ₡ABIN`}</Subline2>
              <Subline2>·</Subline2>
              <CopyText text={ens ?? profile?.account?.address ?? ''}>
                <Subline2>
                  {ens ?? shortenedAddress(profile?.account?.address)}
                </Subline2>
              </CopyText>
            </BalanceAddressContainer>
          </ProfileInfoContainer>
        </ProfileSummary>
        <ProfileHeaderButton profile={profile} isOwnProfile={isOwnProfile} />
      </Container>
    </ContentCard>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2.4rem;
  width: 100%;
`

const BalanceAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`

const ProfileSummary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.6rem;
`
