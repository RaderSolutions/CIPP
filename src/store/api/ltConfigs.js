/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const configsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listConfigs: builder.query({
      query: () => ({
        // TODO ?
        path: '/api/GrabConfigs',
        // params: { 
        //     config: config
        // }
      }),
    }),
}),
})

export const { 
    useListConfigsQuery
} = configsApi
export default configsApi