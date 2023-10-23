/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const ratelLicensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listFopLicenseKey: builder.query({
      query: ({ tenantDomain }) => ({
        path: '/api/LtListRatelFopLicenseKey',
        params: { TenantFilter: tenantDomain },
      }),
      transformResponse: (response) => {
        if (!response) {
          return []
        }
        return response
      },
    }),
    listDpmaLicenseKey: builder.query({
      query: ({ tenantDomain }) => ({
        path: '/api/LtRatelListDPMA',
        params: { TenantFilter: tenantDomain },
      }),
      transformResponse: (response) => {
        if (!response) {
          return []
        }
        return response
      },
    }),
  }),
})

export const { useListFopLicenseKeyQuery, useListDpmaLicenseKeyQuery } = ratelLicensesApi
