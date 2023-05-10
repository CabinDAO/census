import { useState } from 'react'
import styled from 'styled-components'
import { notch } from '../layouts/common.styles'
import { Avatar } from './Avatar'
import { MenuItemLink } from './navbar/MenuItemLink'
import { ProfileNavMenu } from './navbar/ProfileNavMenu'
import { useFeatures } from '@/components/hooks/useFeatures'
import { Feature } from '@/lib/features'

const SingleMenuItem = styled.div`
  padding: 1.6rem;
  justify-content: center;
  align-items: center;
`

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.green800};
  justify-content: center;
  align-items: center;
  max-width: 8rem;
  width: min-content;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  border-bottom-right-radius: 2.5rem;
  box-shadow: 0.8rem 0.8rem 0rem ${({ theme }) => theme.colors.yellow900};
  ${notch(1)}
`

const Divider = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.green900};
`

const NeighborhoodsItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.7rem 1.6rem;p
  justify-content: center;
  align-items: center;
  gap: 2.7rem;
`

interface NavbarProps {
  profileId?: string
  avatarUrl?: string
}

export const Navbar = ({ profileId, avatarUrl }: NavbarProps) => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false)
  const { hasFeature } = useFeatures()
  const hasCityFeature = hasFeature(Feature.City)

  return (
    <>
      <Container>
        <SingleMenuItem>
          <MenuItemLink menuItem={'home'} profileId={profileId} />
        </SingleMenuItem>
        <Divider />
        <NeighborhoodsItemGroup>
          <MenuItemLink menuItem={'members'} profileId={profileId} />
          <MenuItemLink menuItem={'neighborhoods'} profileId={profileId} />
          {hasCityFeature && (
            <MenuItemLink menuItem={'offers'} profileId={profileId} />
          )}
        </NeighborhoodsItemGroup>
        <Divider />
        <SingleMenuItem>
          {profileId && (
            <Avatar
              src={avatarUrl}
              size={3.2}
              onClick={() => setProfileMenuVisible(!profileMenuVisible)}
            />
          )}
          <MenuItemLink menuItem={'signIn'} profileId={profileId} />
        </SingleMenuItem>
      </Container>
      <ProfileNavMenu visible={profileMenuVisible} />
    </>
  )
}
