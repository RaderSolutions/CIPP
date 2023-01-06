/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const variablesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editVariable: builder.mutation({
      query: ({tenantDomain, key, value, family} ) => ({
        // eslint-disable-next-line no-template-curly-in-string
        path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=astFamily|Value=${family},Key=astKey|Value=${key},Key=astValue|value=${value}&RatelScript=true&ScriptId=7355`,
        method: 'post',
      }),
    }),
    listVariables: builder.query({
      query: ({ tenantDomain }) => ({
        path: '/api/LtListRatelVariables',
        params: {
          TenantFilter: tenantDomain,
        },
      }),
    }),
    listVariable: builder.query({
      query: ({ tenantDomain, family, key }) => ({
        path: '/api/LtListRatelVariables',
        params: { family: family, TenantFilter: tenantDomain, key: key },
      }),
    }),
    addVariable: builder.mutation({
      query: ({ tenantDomain, key, value, family }) => ({
        path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=astFamily|Value=${family},Key=astKey|Value=${key},Key=astValue|value=${value}&RatelScript=true&ScriptId=7355`,
        method: 'post',
      }),
    }),
  }),
})

export const {
  useEditVariableMutation,
  useListVariablesQuery,
  useListVariableQuery,
  useAddVariableMutation,
} = variablesApi
export default variablesApi
