export const queries = {
  base: '(min-width: 0px)',
  sm: '(min-width: 320px)',
  sm_max: '(min-width: 319px)',
  md: '(min-width: 760px)',
  md_max: '(max-width: 759px)',
  lg: '(min-width: 1025px)',
  lg_max: '(max-width: 1024px)',
  xl: '(min-width: 1441px)',
  xl_max: '(max-width: 1440px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
}
const theme = {
  bp: {
    base: `@media only screen and ${queries.base}`,
    sm: `@media only screen and ${queries.sm}`,
    sm_landscape: `@media only screen and ${queries.sm} and ${queries.landscape}`,
    md: `@media only screen and ${queries.md}`,
    md_max: `@media only screen and ${queries.md_max}`,
    md_landscape: `@media only screen and ${queries.md} and ${queries.landscape}`,
    lg: `@media only screen and ${queries.lg}`,
    lg_max: `@media only screen and ${queries.lg_max}`,
    xl: `@media only screen and ${queries.xl}`,
    xl_max: `@media only screen and ${queries.xl_max}`,
    portrait: `@media only screen and ${queries.portrait}`,
    landscape: `@media only screen and ${queries.landscape}`,
  },
  colors: {
    twitter: '#1d9bf0',
    green900: '#1D2B2A',
    green800: '#324841',
    green700: '#06774C',
    green600: '#03AB5B',
    green500: '#06DF59',
    green400: '#00FF47',
    green300: '#4FFF79',
    green200: '#A2FFB3',
    green100: '#E0FFE5',
    blue900: '#192634',
    blue800: '#263A4D',
    blue700: '#324E65',
    blue600: '#507996',
    blue500: '#77A9C7',
    blue400: '#90C5E3',
    blue300: '#ACE1FF',
    blue200: '#D0EFFF',
    blue100: '#ECF9FF',
    yellow900: '#17120B',
    yellow800: '#493922',
    yellow700: '#7B5E35',
    yellow600: '#AD844C',
    yellow500: '#DEAE6A',
    yellow400: '#FDC67B',
    yellow300: '#FED7A2',
    yellow200: '#FEE9CB',
    yellow100: '#FDF3E7',
    red900: '#310B05',
    red800: '#6B2115',
    red700: '#A43725',
    red600: '#CE523C',
    red500: '#D97763',
    red400: '#E0907E',
    red300: '#EBB5A6',
    red200: '#F6DACD',
    red100: '#FBEDE6',
    white: '#FFFFFF',
    black: '#000000',
  },
  border: {
    light: '1px solid rgba(29, 42, 42, 0.12)',
  },
}

export const availableColors = Object.keys(theme.colors)

export type ColorName = keyof typeof theme.colors

export default theme
