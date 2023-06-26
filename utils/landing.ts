export type CollapsibleItem = {
  title: string
  description: string
}

export type CollapsibleData = {
  title: string
  subtitle: string
  image: string
  items: CollapsibleItem[]
}

export const collapsibleData: CollapsibleData[] = [
  {
    title: 'Cabin locations share 3 traits:',
    subtitle: 'Features',
    image: '/images/landing-info-1.jpeg',
    items: [
      {
        title: 'Access to nature',
        description: 'Breathtaking scenery available outside the front door.',
      },
      {
        title: 'Fast internet',
        description:
          'Reliable, high-speed WiFi to make it easy to connect and do work.',
      },
      {
        title: 'Strong community',
        description:
          'Good vibes for thoughtful people to live together smoothly.',
      },
    ],
  },
  {
    title: 'How it works',
    subtitle: 'The Network City',
    image: '/images/landing-info-2.jpeg',
    items: [
      {
        title: 'Create Your Profile',
        description:
          'Your profile is like your digital passport where you can collect and show off your experiences.',
      },
      {
        title: 'Connect within the Community',
        description:
          'Cross paths with other beautiful people and opportunities at our community gatherings online or IRL.',
      },
      {
        title: 'Unlock Citizenship',
        description:
          'Citizenship is a subscription membership for accessing our network city. A current Citizen must nominate you for citizenship.',
      },
      {
        title: 'Book Your Next Trip',
        description:
          'Browse our directory of coliving offers and work/stay residencies across the network city and book your next experience. ',
      },
    ],
  },
]

export const communityMemberBulletPoints = [
  'Eligible for work/stay residencies on the City Directory',
  'Build your profile',
  'Collect passport stamps',
  'Earn and level up your roles',
  'Access the Member Directory',
]

export const citizenBulletPoints = [
  'Colive across the City Directory',
  'Post your property to the City Directory',
  'Receive governance tokens for voting',
  'Access Citizen-only special events',
  'Merch drops and member discounts',
]
