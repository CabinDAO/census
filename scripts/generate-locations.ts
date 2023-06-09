import { query as q } from 'faunadb'
import { faunaServerClient } from '../lib/fauna-server/faunaServerClient'
import { LocationType } from '../generated/graphql'
import { formatISO } from 'date-fns'

const range = Array.from({ length: 100 }, (x, i) => i)

const locations = range.map((i) => {
  const publishedAt = formatISO(new Date())
  const caretakerEmail = `autogenerated_${i}@gmail.com`
  const tagline = `Autogenerated tagline ${i}`
  const name = `Location ${i}`
  const sleepCapacity = Math.floor(Math.random() * 10)
  const internetSpeed = Math.floor(Math.random() * 200)
  const address = {
    lng: -99.54509739999999,
    formattedAddress: 'Texas Hill Country, TX, USA',
    country: 'United States',
    locality: 'Texas Hill Country',
    admininstrativeAreaLevel1Short: 'TX',
    countryShort: 'US',
    admininstrativeAreaLevel1: 'Texas',
    lat: 30.1795917,
  }
  const description = '[{"type":"paragraph","children":[{"text":"A place"}]}]'
  const locationType =
    i % 2 === 0 ? LocationType.Outpost : LocationType.Neighborhood

  return {
    address,
    caretakerEmail,
    publishedAt,
    tagline,
    name,
    sleepCapacity,
    internetSpeed,
    description,
    locationType,
  }
})

async function generateLocations() {
  console.info('Generating locations...')

  await faunaServerClient.query(
    q.Let(
      {
        careTakerRef: q.Select(
          0,
          q.Paginate(q.Documents(q.Collection('Profile')), { size: 1 })
        ),
      },
      q.Map(
        locations,
        q.Lambda(
          'location',
          q.Create(q.Collection('Location'), {
            data: {
              voteCount: 0,
              offerCount: 0,
              address: q.Select('address', q.Var('location')),
              caretakerEmail: q.Select('caretakerEmail', q.Var('location')),
              publishedAt: q.Time(q.Select('publishedAt', q.Var('location'))),
              tagline: q.Select('tagline', q.Var('location')),
              name: q.Select('name', q.Var('location')),
              sleepCapacity: q.Select('sleepCapacity', q.Var('location')),
              internetSpeedMbps: q.Select('internetSpeed', q.Var('location')),
              description: q.Select('description', q.Var('location')),
              locationType: q.Select('locationType', q.Var('location')),
              caretaker: q.Var('careTakerRef'),
            },
          })
        )
      )
    )
  )
}

generateLocations()
