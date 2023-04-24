import { query as q } from 'faunadb'

export const onlyBy = (fieldKey: string) =>
  q.Query(
    q.Lambda(
      'ref',
      q.Equals(
        q.CurrentIdentity(),
        q.Select(['data', fieldKey], q.Get(q.Var('ref')))
      )
    )
  )
