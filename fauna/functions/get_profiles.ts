import { query as q } from 'faunadb'
import { FunctionResource } from 'fauna-gql-upload'
import { PaginatedMatch } from '../lib/PaginatedMatch'
import { ProfileSortType } from '../../generated/graphql'
import { GetProfilesMatch } from '../lib/GetProfilesMatch'

const getProfiles: FunctionResource = {
  name: 'get_profiles',
  body: q.Query(
    q.Lambda(
      ['input', 'size', 'after', 'before'],
      q.Let(
        {
          sort: q.Select(
            ['sort'],
            q.Var('input'),
            ProfileSortType.CreatedAtDesc
          ),
          sortIndex: q.If(
            q.Equals(q.Var('sort'), ProfileSortType.CreatedAtAsc),
            q.Index('profiles_sort_by_createdAt_asc'),
            q.Index('profiles_sort_by_createdAt_desc')
          ),
        },
        PaginatedMatch(
          q.Join(GetProfilesMatch(q.Var('input')), q.Var('sortIndex')),
          q.Var('size'),
          q.Var('after'),
          q.Var('before'),
          // Select the 2nd element in the index (the ref)
          q.Select(1, q.Var('value'))
        )
      )
    )
  ),
}

export default getProfiles
