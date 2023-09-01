/* eslint-disable prettier/prettier */
import { baseApi } from 'src/store/api/baseApi'

export const ratelDevicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editDevice: builder.mutation({
      query: (device) => ({
        path: '/api/LtAddRatelDevice',
        method: 'post',
        data: device,
      }),
    }),
    listDevices: builder.query({
      query: ({ tenantDomain }) => ({
        path: '/api/LtListRatelDevices',
        params: {
          TenantFilter: tenantDomain,
        },
      }),
    }),
    listDevice: builder.query({
      query: ({ tenantDomain, deviceId }) => ({
        path: '/api/LtListRatelDevices',
        params: { DeviceId: deviceId, TenantFilter: tenantDomain },
      }),
    }),
    listDeviceLocations: builder.query({
      query: ({tenantDomain}) => ({
        path: '/api/LtListClientLocations',
        params: {TenantFilter: tenantDomain},
      })
    }),
    listDeviceContacts: builder.query({
      query: ({tenantDomain}) => ({
        path: '/api/LtListClientContacts',
        params: {TenantFilter: tenantDomain},
      })
    }),
    listDeviceContact: builder.query({
      query: ({tenantDomain, contactID}) => ({
        path: '/api/LtListClientContacts',
        params: {TenantFilter: tenantDomain, contactID: contactID},
      })
    }),
    listDeviceModels: builder.query({
      query: () => ({
        path: '/api/LtListRatelDeviceModels'
      })
    }),
    addDevice: builder.mutation({
      query: ({ device }) => ({
        path: '/api/LtAddRatelDevice',
        data: device,
      }),
    }),
  }),
})

export const {
  useEditDeviceMutation,
  useListDevicesQuery,
  useListDeviceQuery,
  useAddDeviceMutation,
  useListDeviceLocationsQuery,
  useListDeviceContactsQuery,
  useListDeviceContactQuery,
  useListDeviceModelsQuery
} = devicesApi
export default devicesApi
