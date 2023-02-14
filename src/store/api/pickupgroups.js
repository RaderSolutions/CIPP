/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const pickupGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listMember: builder.query({
      query: ({ tenantDomain, extension, type }) => ({
        path: '/api/LtListRatelPickupGroups',
        params: {
          TenantFilter: tenantDomain,
          Extension: extension,
          Type: type,
        },
      }),
    }),
  }),
})

export const { useListPickupMemberQuery } = pickupGroupsApi
export default pickupGroupsApi
