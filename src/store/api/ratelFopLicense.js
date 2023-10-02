import { baseApi } from 'src/store/api/baseApi'

export const ratelFopLicenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listFopLicenseKeyQuery: builder.query({
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
  }),
})

export const { useListFopLicenseKeyQuery } = ratelFopLicenseApi
