/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const dialplanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      listDialplans: builder.query({
            query: ({ tenantDomain }) => ({
                path: '/api/LtRatelCustomDialplans',
                params: {
                    TenantFilter: tenantDomain,
                },
            }),
        }),})
    })

export const {  useListDialplansQuery } = dialplanApi