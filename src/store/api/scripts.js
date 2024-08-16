/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const scriptsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listScript: builder.mutation({
      query: ({script}) => ({
        path: '/api/LtListScript',
        params: { 
            script: script
        }
      }),
    }),
}),
})

export const { 
    useListScriptQuery
} = scriptsApi
