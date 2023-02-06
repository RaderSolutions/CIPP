/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const configsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listConfigs: builder.mutation({
      query: ({config}) => ({
        // TODO ?
        path: '/api/LtListConfigs',
        params: { 
            config: config
        }
      }),
    }),
}),
})

export const { 
    useListConfigsQuery
} = configsApi
export default configsApi