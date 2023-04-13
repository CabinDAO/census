import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { ActivityItemFragment, ActivityType } from '@/generated/graphql'
import { roleInfoFromType } from '@/utils/roles'
import { formatDistance, parseISO } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '../Avatar'
import IconButton from '../IconButton'
import { ProfileIcons } from '../ProfileIcons'
import { Caption, H4 } from '../Typography'
import { getPostSlots } from './post-slots'
import { MoreMenu } from '../MoreMenu'
import { useUser } from '@/components/auth/useUser'
import { useModal } from '@/components/hooks/useModal'
import { DeletePostModal } from './DeletePostModal'

type PostVariant = 'full' | 'compact'
export interface PostProps {
  activityItem: ActivityItemFragment
  baseDate: Date
  onLike?: () => void
  onUnlike?: () => void
  hovered?: boolean
  variant?: PostVariant
}

export const Post = (props: PostProps) => {
  const { activityItem, onLike, onUnlike, variant = 'full' } = props
  const { profile, type } = activityItem.activity

  const roleInfos = profile.roles.map((role) => roleInfoFromType(role.role))
  const citizenshipStatus = profile.citizenshipStatus
  const { Content, Media } = getPostSlots(props)
  const [hovered, setHovered] = useState(false)
  const { deviceSize } = useDeviceSize()
  const { user } = useUser()
  const { showModal } = useModal()

  const displayMoreMenu =
    profile._id === user?._id && type === ActivityType.Text

  const handleDeletePost = () => {
    showModal(() => <DeletePostModal activityItem={activityItem} />)
  }

  return (
    <Container
      variant={variant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ContentContainer>
        {variant === 'full' && (
          <ProfileContainer>
            <LeftContainer href={`/profile/${profile._id}`} passHref>
              <Avatar src={profile.avatar?.url} size={3.2} />
              <ProfileName>{profile.name}</ProfileName>
              <ProfileIcons
                citizenshipStatus={citizenshipStatus}
                roleInfos={roleInfos}
              />
            </LeftContainer>
            {displayMoreMenu && (
              <RightContainer>
                <MoreMenu
                  options={[
                    {
                      label: 'Delete post',
                      icon: 'trash',
                      onClick: handleDeletePost,
                    },
                  ]}
                />
              </RightContainer>
            )}
          </ProfileContainer>
        )}
        {Content && <Content {...props} hovered={hovered} />}
        <ActivityDate {...props} />
        {Media && (variant == 'full' || deviceSize === 'mobile') && (
          <Media {...props} hovered={hovered} />
        )}
        <ReactionsContainer>
          {activityItem.hasReactionByMe ? (
            <IconButton
              icon="heart-solid"
              size={2}
              color="red600"
              onClick={onUnlike}
            />
          ) : (
            <IconButton icon="heart-outline" size={2} onClick={onLike} />
          )}
          <Caption>{activityItem.reactionCount}</Caption>
        </ReactionsContainer>
      </ContentContainer>
      {Media && variant == 'compact' && deviceSize !== 'mobile' && (
        <Media {...props} hovered={hovered} />
      )}
    </Container>
  )
}

interface ContainerProps {
  variant: PostVariant
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  &:not(:first-child) {
    padding-top: 1.6rem;
  }

  &:not(:last-child) {
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(29, 42, 42, 0.12);
  }

  ${({ variant }) =>
    variant === 'compact' &&
    `
  flex-direction: row;
  justify-content: space-between;
  `}
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const LeftContainer = styled(Link)`
  display: flex;
  align-items: center;
`

const RightContainer = styled.div`
  position: relative;
`

const ProfileName = styled(H4)`
  margin-left: 1.2rem;
  margin-right: 0.8rem;
`

const ReactionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const ActivityDate = (props: PostProps) => (
  <Caption>
    {formatDistance(
      parseISO(props.activityItem.activity.timestamp),
      props.baseDate
    )}
    {' ago'}
  </Caption>
)
