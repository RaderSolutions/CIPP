/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const ratelDidsApi = baseApi.injectEndpoints({
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

    export const {
        useListDialplansQuery,
    } = dialplanApi
    export default dialplanApi