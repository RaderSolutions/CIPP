/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect } from 'react'
import SelectSearch, { fuzzySearch } from 'react-select-search'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useListTenantsQuery } from 'src/store/api/tenants'
import { setCurrentTenant } from 'src/store/features/app'
import { CDropdown, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { queryString } from 'src/helpers'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CippTenantOffcanvas from './CippTenantOffcanvas'
import CippfuzzySearch from './CippFuzzySearch'

const TenantSelector = ({ action, showAllTenantSelector = true, NavSelector = false }) => {
  const currentTenant = useSelector((state) => state.app.currentTenant)
  const {
    data: tenants = [
      {
        defaultDomainName: '',
        customerId: '',
        displayName: 'Did not retrieve tenants. Perform a permissions check',
      },
    ],
    isLoading,
    isSuccess,
    error,
  } = useListTenantsQuery({ showAllTenantSelector })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParams = useCallback(
    (params) => {
      navigate(`${queryString(params)}`, { replace: true })
    },
    [navigate],
  )
  useEffect(() => {
    console.log('tenants', tenants)
    let target
    target = tenants.filter((t) => t.RowKey === '641f2360-2742-4451-afcc-8b70fd778c3f')

    console.log('target', target)
  }, [tenants])
  useEffect(() => {
    const Paramcount = Array.from(searchParams).length
    if (Paramcount <= 1) {
      const customerId = searchParams.get('customerId')
      if (customerId && isSuccess) {
        const currentTenant = tenants.filter((tenant) => tenant.customerId === customerId)
        if (currentTenant.length > 0) {
          dispatch(setCurrentTenant({ tenant: currentTenant[0] }))
        }
      }
      if (!customerId && Object.keys(currentTenant).length > 0) {
        updateSearchParams({ customerId: currentTenant?.customerId })
      }
    }
  }, [dispatch, isSuccess, searchParams, currentTenant, tenants, updateSearchParams])

  const activated = (customerId) => {
    const selectedTenant = tenants.filter((t) => {
      return t.customerId === customerId
    })
    dispatch(setCurrentTenant({ tenant: selectedTenant[0] }))
    if (typeof action === 'function') {
      action(selectedTenant[0])
    } else {
      setSearchParams({ customerId: customerId })
    }
  }

  let placeholder = 'Select Tenant'
  if (isLoading) {
    placeholder = 'Loading...'
  } else if (error) {
    placeholder = 'Error loading tenants'
  }

  return (
    <>
      {NavSelector && (
        <>
          {/* <CDropdown 
          component="li" 
          variant="nav-item" 
          className="flex-grow-1 my-auto"
          >
            <CDropdownToggle>
              {currentTenant?.customerId !== 'AllTenants' ? (
                <CippTenantOffcanvas tenant={currentTenant} buildingIcon={true} />
              ) : (
                <FontAwesomeIcon icon={faBuilding} className="mx-2" />
              )}
              {currentTenant?.defaultDomainName ? (
                <>
                  <span className="text-wrap ms-2">{currentTenant.displayName}</span>
                </>
              ) : (
                placeholder
              )}
            </CDropdownToggle>
            <CDropdownMenu 
            className="tenantDropdown"
            > */}
          <div
            style={{
              maxWidth: '1000px',
            }}
          >
            <SelectSearch
              style={{
                maxWidth: '1000px',
              }}
              search
              onChange={activated}
              filterOptions={CippfuzzySearch}
              placeholder={placeholder}
              disabled={isLoading}
              value={currentTenant && currentTenant.customerId}
              options={tenants.map(({ customerId, displayName, defaultDomainName }) => ({
                value: customerId,
                name: `${displayName} (${defaultDomainName})`,
              }))}
            />
          </div>
          {/* </CDropdownMenu>
          </CDropdown> */}
        </>
      )}
      {!NavSelector && (
        <SelectSearch
          search
          onChange={activated}
          filterOptions={CippfuzzySearch}
          placeholder={placeholder}
          disabled={isLoading}
          value={currentTenant && currentTenant.customerId}
          options={tenants.map(({ customerId, displayName, defaultDomainName }) => ({
            value: customerId,
            name: [displayName] + [` (${defaultDomainName})`],
          }))}
        />
      )}
    </>
  )
}

TenantSelector.propTypes = {
  action: PropTypes.func,
  NavSelector: PropTypes.bool,
  showAllTenantSelector: PropTypes.bool,
}

export default TenantSelector
