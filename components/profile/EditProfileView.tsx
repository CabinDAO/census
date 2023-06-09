import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useProfile } from '../auth/useProfile'
import { EditProfileForm } from './EditProfileForm'
import { useState } from 'react'
import {
  UpdateProfileInput,
  useUpdateProfileMutation,
  ProfileRoleType,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { validateProfileInput } from './validations'
import { ApolloError } from '@apollo/client'
import { useModal } from '../hooks/useModal'
import { ErrorModal } from '../ErrorModal'
import { FAUNA_ERROR_TO_MESSAGE_MAPPING } from '@/utils/profile-submission'
import { ActionBar } from '../core/ActionBar'
import styled from 'styled-components'

export const EditProfileView = () => {
  const router = useRouter()
  const { user } = useProfile({ redirectTo: '/' })
  const [updateProfile] = useUpdateProfileMutation()
  const [editProfileInput, setEditProfileInput] = useState<UpdateProfileInput>(
    {}
  )
  const [roleTypes, setRoleTypes] = useState<ProfileRoleType[] | null>(null)
  const { showModal } = useModal()

  const handleSubmit = async () => {
    if (!editProfileInput) return

    if (
      editProfileInput.hasOwnProperty('contactFields') &&
      editProfileInput.contactFields
    ) {
      editProfileInput.contactFields = editProfileInput.contactFields.filter(
        (contactField) => contactField.value !== ''
      )
    }

    if (user && validateProfileInput(editProfileInput)) {
      try {
        await updateProfile({
          variables: {
            id: user._id,
            data: editProfileInput,
            roleTypes,
          },
        })
        router.push(`/profile/${user._id}`)
      } catch (error: unknown) {
        if (error instanceof ApolloError) {
          const { graphQLErrors } = error
          const [graphQLError] = graphQLErrors

          if (graphQLError) {
            const { extensions } = graphQLError
            const mappedError =
              FAUNA_ERROR_TO_MESSAGE_MAPPING[extensions?.code as string]

            if (mappedError) {
              showModal(() => (
                <ErrorModal
                  title="Profile Submission Error"
                  description={mappedError}
                />
              ))
            } else {
              showModal(() => (
                <ErrorModal
                  title="Profile Submission Error"
                  description="Error updating profile"
                />
              ))
            }
          }
        } else {
          showModal(() => (
            <ErrorModal
              title="Profile Submission Error"
              description="Error updating profile"
            />
          ))
        }
      }
    }
  }

  const handleRolesChange = (roleTypes: ProfileRoleType[]) => {
    if (!roleTypes) return
    setRoleTypes(roleTypes)
  }

  const handleChange = (input: UpdateProfileInput) => {
    setEditProfileInput((prev) => ({
      ...prev,
      ...input,
    }))
  }

  if (!user) {
    return null
  }

  return (
    <StyledLayout
      actionBar={
        <ActionBar
          primaryButton={{
            label: 'Save Profile',
            onClick: handleSubmit,
          }}
        />
      }
    >
      <TitleCard
        title="Edit profile"
        icon="close"
        iconHref={`/profile/${user._id}`}
      />
      <ContentCard shape="notch">
        <EditProfileForm
          user={user}
          editProfileInput={editProfileInput}
          onChange={handleChange}
          onRolesChange={handleRolesChange}
        />
      </ContentCard>
    </StyledLayout>
  )
}

const StyledLayout = styled(SingleColumnLayout)`
  padding-bottom: 11.5rem;

  ${({ theme }) => theme.bp.md} {
    padding-bottom: 17rem;
  }
`
