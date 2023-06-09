import {
  CitizenshipStatus,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'

export const DEFAULT_PROFILE_PROPS = {
  _id: '123',
  createdAt: '2023-02-01T00:00:00.000Z',
  name: 'John Doe',
  email: 'john.doe@creatorcabins.com',
  avatar: {
    url: '/images/test-avatar.jpeg',
  },
  roles: [
    {
      role: ProfileRoleType.Builder,
      level: ProfileRoleLevelType.Artisan,
    },
  ],
  citizenshipStatus: CitizenshipStatus.Verified,
  account: {
    _id: '456',
    cabinTokenBalance: '20000000000000000000',
  },
  bio: 'I’m a construction enthusiast with a heart for nature.',
  cabinTokenBalanceInt: 20,
  badgeCount: 0,
}
