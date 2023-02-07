/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const pickupGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listMember: builder.query({
      query: ({ ext, type }) => ({
        path: '/api/LtListRatelPickupGroups',
        params: {
          Extension: ext,
          Type: type,
        },
      }),
    }),
    //   editMember: builder.mutation({
    //     query: (member) => ({
    //       path: '/api/LtRatelPickupGroups',
    //       method: 'post',
    //       data: member,
    //     }),
    //   }),
  }),
})

export const { useListPickupMemberQuery, useEditMemberMutation } = pickupGroupsApi
