/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pickupGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listPickupMember: builder.query({
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
