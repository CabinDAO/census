import { SetupStepForm } from './SetupStepForm'
import { StepProps } from './step-configuration'
import styled from 'styled-components'
import { Subline1 } from '@/components/core/Typography'
import {
  ProfileRole,
  ProfileRoleInput,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'
import { RoleChip } from '@/components/core/RoleChip'
import { useState } from 'react'
import { useUser } from '@/components/auth/useUser'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'

export const RoleStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useUser()
  const roles = Object.keys(ProfileRoleType) as ProfileRoleType[]

  const allRoles = user?.roles ?? []
  const currentRoles = [] as ProfileRole[]
  const onChainRoles = [] as ProfileRole[]

  allRoles.forEach((role) =>
    role.hatId ? onChainRoles.push(role) : currentRoles.push(role)
  )

  const onChainRoleTypes = onChainRoles.map((cr) => cr.role)

  const [selectedRoles, setSelectedRoles] = useState<ProfileRoleType[]>(
    currentRoles.map((cr) => cr.role)
  )

  const { updateProfile } = useUpdateProfile()

  const handleNext = async () => {
    const selectRolesInputs = selectedRoles.map(
      (role) =>
        ({
          role,
          level: ProfileRoleLevelType.Apprentice,
          hatId: null,
        } as ProfileRoleInput)
    )
    const onChainRoleInputs = onChainRoles.map((role) => ({
      role: role.role,
      level: role.level,
      hatId: role.hatId,
    })) as ProfileRoleInput[]

    // TODO: Atomic update - https://app.dework.xyz/indiedao/cabin-census?taskId=0ae386bb-bc50-439b-937e-f23f7f46f5b3
    const newRoles = onChainRoleInputs.concat(
      selectRolesInputs
    ) as ProfileRoleInput[]

    await updateProfile({
      roles: newRoles,
    })

    onNext()
  }

  const handleSelectRole = (role: ProfileRoleType) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  return (
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <SetupStepContainer>
        <Subline1>Choose yor interests</Subline1>
        <RoleGroup>
          {roles.map((role) => {
            return (
              <RoleChip
                key={role}
                roleType={role}
                selected={
                  selectedRoles.includes(role) ||
                  onChainRoleTypes.includes(role)
                }
                onSelect={() => handleSelectRole(role)}
                disabled={onChainRoleTypes.includes(role)}
              />
            )
          })}
        </RoleGroup>
      </SetupStepContainer>
    </SetupStepForm>
  )
}

export const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`

const RoleGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  auto-flow: row;
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`
