import { ProfileRoleLevelType } from '@/generated/graphql'

export interface LevelInfo {
  name: string
  number: number
}

const LevelInfoByType: Record<ProfileRoleLevelType, LevelInfo> = {
  [ProfileRoleLevelType.Apprentice]: {
    name: 'Apprentice',
    number: 1,
  },
  [ProfileRoleLevelType.Artisan]: {
    name: 'Artisan',
    number: 2,
  },
  [ProfileRoleLevelType.Custodian]: {
    name: 'Custodian',
    number: 3,
  },
}

export const levelInfoFromType = (
  levelType: ProfileRoleLevelType
): LevelInfo => {
  return LevelInfoByType[levelType]
}

export const allLevels = Object.values(ProfileRoleLevelType).map(
  (levelType) => ({
    ...levelInfoFromType(levelType),
    levelType,
  })
)
