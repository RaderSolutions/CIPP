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
    editMember: builder.mutation({
        query: (member) => ({
          path: '/api/',
          method: 'post',
          data: member,
        }),
      }),
  }),
})

export const { useListPickupMemberQuery, useEditMemberMutation } = pickupGroupsApi
export default pickupGroupsApi
