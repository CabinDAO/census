import { query as q } from 'faunadb'
import { IndexResource } from 'fauna-gql-upload'

const offersByOfferType: IndexResource = {
  name: 'offers_by_offerType',
  source: {
    collection: q.Collection('Offer'),
  },
  terms: [{ field: ['data', 'offerType'] }],
  values: [{ field: ['data', 'endDate'] }, { field: ['ref'] }],
}

export default offersByOfferType
