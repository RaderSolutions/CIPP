/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const scriptsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listScript: builder.query({
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
