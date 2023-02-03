/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const pickupGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listMember: builder.query({
      query: ({ tenantDomain, ext, type }) => ({
        path: '/api/LtListRatelPickupGroups',
        params: {
          TenantFilter: tenantDomain,
        //   MailboxId: 'id',
          extensionId: ext,
          membershipType: type,
        },
      }),
    }),
  }),
})

export const { useListPickupMemberQuery } = pickupGroupsApi
export default pickupGroupsApi
