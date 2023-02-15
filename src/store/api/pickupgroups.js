/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pickupGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listMember: builder.query({
      query: ({ tenantDomain, extension, type }) => ({
        path: '/api/LtListRatelPickupGroups',
        params: {
          TenantFilter: tenantDomain,
          extension: extension,
          Type: type,
        },
      }),
    }),
  }),
})

export const { useListMemberQuery } = pickupGroupsApi
