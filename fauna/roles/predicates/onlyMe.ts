import { query as q } from 'faunadb'

export const onlyMe = q.Query(
  q.Lambda(
    'ref',
    q.Equals(
      q.CurrentIdentity(),
      q.Select(['data', 'profile'], q.Get(q.Var('ref')))
    )
  )
)
