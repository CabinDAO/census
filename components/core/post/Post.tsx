import { ActivityFragment } from '@/generated/graphql'
import { roleInfoFromType } from '@/utils/roles'
import { formatDistance, parseISO } from 'date-fns'
import styled from 'styled-components'
import { Avatar } from '../Avatar'
import Icon from '../Icon'
import { ProfileIcons } from '../ProfileIcons'
import { Caption, H4 } from '../Typography'
import { getPostSlots } from './post-slots'

export interface PostProps {
  activity: ActivityFragment
  baseDate: Date
}

export const Post = (props: PostProps) => {
  const { activity } = props
  const { profile } = activity

  const roleInfos = profile.roles.map((role) => roleInfoFromType(role.role))
  const citizenshipStatus = profile.citizenshipStatus
  const { Content, Media } = getPostSlots(props)

  return (
    <Container>
      <ProfileContainer>
        <Avatar src={profile.avatar?.url} />
        <ProfileName>{profile.name}</ProfileName>
        <ProfileIcons
          citizenshipStatus={citizenshipStatus}
          roleInfos={roleInfos}
        />
      </ProfileContainer>
      {Content && <Content {...props} />}
      <ActivityDate {...props} />
      {Media && <Media {...props} />}
      {/* TODO: Hydrate with real data */}
      <ReactionsContainer>
        <Icon name="heart-outline" size={2} />
        <Caption>0</Caption>
      </ReactionsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &:not(:first-child) {
    padding-top: 1.6rem;
  }

  &:not(:last-child) {
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(29, 42, 42, 0.12);
  }
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
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
  <div>
    {formatDistance(parseISO(props.activity.timestamp), props.baseDate)}
  </div>
)