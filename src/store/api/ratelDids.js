/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const didsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editDid: builder.mutation({
      query: (did) => ({
        path: '/api/LtRatelDIDs',
        method: 'post',
        data: did,
      }),
    }),
    listDids: builder.query({
      query: ({ tenantDomain }) => ({
        path: '/api/LtListRatelDIDs',
        params: {
          TenantFilter: tenantDomain,
        },
      }),
    }),
    listDid: builder.query({
      query: ({ tenantDomain, didNumber }) => ({
        path: '/api/LtListRatelDIDs',
        params: { DidNumber: didNumber, TenantFilter: tenantDomain },
      }),
    }),
    listSampleDialplans: builder.query({
      query: () => ({
        path: '/api/LtListRatelSampleDialplans',
        params: {Name: Name},
      })
    }),
    addDid: builder.mutation({
      query: ({ did }) => ({
        path: '/api/LtRatelDIDs',
        data: did,
      }),
    }),
  }),
})

export const {
  useEditDidMutation,
  useListDidsQuery,
  useListDidQuery,
  useAddDidMutation,
  useListSampleDialplansQuery
} = didsApi 
