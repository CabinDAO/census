import { GetProfileByAddress } from '@/fauna/lib/GetProfileByAddress'
import { UpsertActivity } from '@/fauna/lib/UpsertActivity'
import { ActivityType, CitizenshipStatus } from '@/generated/graphql'
import { query as q } from 'faunadb'
import { SelectRef } from 'faunadb-fql-lib'
import { faunaServerClient } from './faunaServerClient'

/**
 * Set the citizenship status of a profile
 * @param address Address of the profile to update
 * @param status Citizenship status to set
 * @returns The updated profile if the status was updated, `null` if the status was already set to the desired value
 */
export const setCitizenshipStatus = async (
  address: string,
  status: CitizenshipStatus,
  tokenId: string | null = null
) => {
  const citizenshipMintedAt =
    status === CitizenshipStatus.Verified ? q.Now() : null

  return faunaServerClient.query(
    q.Let(
      {
        profile: GetProfileByAddress(address),
        currentStatus: q.Select(
          ['data', 'citizenshipStatus'],
          q.Var('profile'),
          null
        ),
      },
      q.If(
        q.Equals(q.Var('currentStatus'), status),
        // Status already matches, do nothing
        null,
        // Only update if the new status is Verified or if the current status is Verified and the new status is Vouched
        q.If(
          q.Or(
            q.Equals(status, CitizenshipStatus.Verified),
            q.And(
              q.Equals(q.Var('currentStatus'), CitizenshipStatus.Verified),
              q.Equals(status, CitizenshipStatus.Vouched)
            )
          ),
          q.Do(
            q.Update(SelectRef(q.Var('profile')), {
              data: {
                citizenshipStatus: status,
                citizenshipMetadata: {
                  tokenId,
                  mintedAt: citizenshipMintedAt,
                },
              },
            }),
            q.If(
              q.Equals(status, CitizenshipStatus.Verified),
              UpsertActivity(q.Var('profile'), {
                key: q.Format(
                  'VerifiedCitizenship|%s',
                  q.Select(['ref', 'id'], q.Var('profile'))
                ),
                timestamp: q.Now(),
                type: ActivityType.VerifiedCitizenship,
                metadata: {
                  citizenshipTokenId: tokenId,
                },
              }),
              null
            )
          ),
          null
        )
      )
    )
  )
}
