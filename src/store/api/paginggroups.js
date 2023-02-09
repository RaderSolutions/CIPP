/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const pagingGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listMember: builder.query({
      query: ({ tenantDomain, extension, type }) => ({
        path: '/api/LtListRatelPagingGroups',
        params: {
          TenantFilter: tenantDomain,
        },
      }),
    }),
  }),
})

export const { useListPagingMemberQuery } = pagingGroupsApi
export default pagingGroupsApi
