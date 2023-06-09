import { useProfile } from '@/components/auth/useProfile'
import { ProfileView } from '@/components/profile/ProfileView'

const MyProfilePage = () => {
  const { user } = useProfile({ redirectTo: '/' })

  if (!user) return null

  return <ProfileView profileId={user._id} />
}

export default MyProfilePage
