import {
  MenuItemOption,
  MenuItemsAuthenticatedMap,
  MenuItemsUnauthenticatedMap,
} from '@/utils/nav/types'
import IconLink from '../IconLink'
import { Tooltip } from '../Tooltip'
import events from '@/lib/googleAnalytics/events'

interface MenuItemLinkProps {
  menuItem: MenuItemOption
  profileId?: string
  authenticated?: boolean
}

export const MenuItemLink = ({
  menuItem,
  profileId,
  authenticated,
}: MenuItemLinkProps) => {
  const menuItemConfig = profileId
    ? MenuItemsAuthenticatedMap[menuItem]
    : MenuItemsUnauthenticatedMap[menuItem]

  const handleClick = () => {
    events.navBarEvent(menuItem)

    if (menuItem === 'signIn') {
      events.signInEvent()
    }
  }

  if (!menuItemConfig) return null

  return (
    <Tooltip
      tooltip={menuItemConfig.displayText ?? ''}
      position="right"
      animate
    >
      <IconLink
        authenticated={authenticated}
        icon={menuItemConfig.icon}
        size={menuItemConfig.iconSize ?? 2.5}
        color={'green400'}
        href={menuItemConfig.path}
        onIconClick={handleClick}
      />
    </Tooltip>
  )
}
