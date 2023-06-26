import styled from 'styled-components'
import { ImageFlex } from '../core/gallery/ImageFlex'
import { hhStyles } from '../core/Typography'
import { AppLink } from '../core/AppLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import theme from '@/styles/theme'
import { useDeviceSize } from '../hooks/useDeviceSize'

export const LandingDiscordSection = () => {
  return (
    <Container>
      <LandingForest>
        <ImageFlex
          alt="forest-network"
          src="/images/landing-forest-network.svg"
          height={32}
          width={84}
        />
      </LandingForest>
      <JoinCTAText />
    </Container>
  )
}

const JoinCTAText = () => {
  const { deviceSize } = useDeviceSize()

  if (deviceSize === 'mobile') {
    return (
      <DiscordCTA>
        <p>Join community</p>
        <MobileDiscordCTA>
          <p>gatherings on</p>
          <StyledAppLink
            iconSize={1.5}
            external
            location={EXTERNAL_LINKS.CABIN_DISCORD}
          >
            <p style={{ color: theme.colors.yellow700 }}>Discord</p>
          </StyledAppLink>
        </MobileDiscordCTA>
      </DiscordCTA>
    )
  } else {
    return (
      <DiscordCTA>
        <p>Join community gatherings on</p>
        <StyledAppLink
          iconSize={2}
          external
          location={EXTERNAL_LINKS.CABIN_DISCORD}
        >
          <p style={{ color: theme.colors.yellow700 }}>Discord</p>
        </StyledAppLink>
      </DiscordCTA>
    )
  }
}

const StyledAppLink = styled(AppLink)`
  ${({ theme }) => theme.bp.md} {
    gap: 1.3rem;
  }
`

const LandingForest = styled.div`
  justify-content: center;
  display: flex;
  width: 100vw;

  ${({ theme }) => theme.bp.md} {
    width: 84rem;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12rem 0 8rem 0;
  gap: 7rem;
`

const DiscordCTA = styled.div`
  ${hhStyles}
  font-size: 2.4rem;
  display: flex;
  flex-direction: column;

  gap: 0rem;

  svg {
    --icon-color: ${({ theme }) => theme.colors.yellow700};
  }

  ${({ theme }) => theme.bp.md} {
    text-align: center;
    gap: 1rem;
    flex-direction: row;
  }

  ${({ theme }) => theme.bp.lg} {
    font-size: 3.2rem;
  }
`

const MobileDiscordCTA = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`
