/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CAlert,
  CAlertLink,
  CContainer,
  CCollapse,
  CHeader,
  CHeaderNav,
  CNavItem,
  CHeaderToggler,
  CImage,
  CSidebarBrand,
  CButton,
  CFormSwitch,
} from '@coreui/react'
import { AppHeaderSearch } from 'src/components/header'
import { TenantSelector } from '../utilities'
import cyberdrainlogolight from 'src/assets/images/CIPP.png'
import cyberdrainlogodark from 'src/assets/images/CIPP_Dark.png'
import raderlogo from 'src/assets/images/raderlogo_b.png'
import raderlogolight from 'src/assets/images/raderlogolight_b.png'
import { Field, Form } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import { setCurrentTheme, setUserSettings, toggleSidebarShow } from 'src/store/features/app'
import { useMediaPredicate } from 'react-media-hook'
import { useGenericGetRequestQuery, useLoadAlertsDashQuery } from 'src/store/api/app'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const AppHeader = () => {



  const dispatch = useDispatch()
  const location = useLocation()
  const [performedUserSettings, setUserSettingsComplete] = useState(false)
  const currentSettings = useSelector((state) => state.app)
  const sidebarShow = useSelector((state) => state.app.sidebarShow)
  const currentTheme = useSelector((state) => state.app.currentTheme)
  const preferredTheme = useMediaPredicate('(prefers-color-scheme: dark)') ? 'impact' : 'cyberdrain'
  const { data: dashboard } = useLoadAlertsDashQuery()

  useEffect(()=>{
    if (dashboard && dashboard.length >= 1) {
      console.log('dashboard', dashboard)
    }
  },[dashboard])
 
  const {
    data: userSettings,
    isLoading: isLoadingSettings,
    isSuccess: isSuccessSettings,
    isFetching: isFetchingSettings,
  } = useGenericGetRequestQuery({
    path: '/api/ListUserSettings',
  })
  useEffect(() => {
    if (isSuccessSettings && !isLoadingSettings && !isFetchingSettings && !performedUserSettings) {
      dispatch(setUserSettings({ userSettings }))
      setUserSettingsComplete(true)
    }
  }, [
    isSuccessSettings,
    isLoadingSettings,
    isFetchingSettings,
    performedUserSettings,
    dispatch,
    userSettings,
  ])

  const SwitchTheme = () => {
    let targetTheme = preferredTheme
    if (isDark) {
      targetTheme = 'cyberdrain'
    } else {
      targetTheme = 'impact'
    }
    document.body.classList = []
    document.body.classList.add(`theme-${targetTheme}`)
    document.body.dataset.theme = targetTheme

    dispatch(setCurrentTheme({ theme: targetTheme }))
  }
  const isDark =
    currentTheme === 'impact' || (currentTheme === 'default' && preferredTheme === 'impact')
  return (
    <>
      <CHeader position="sticky">
        <CSidebarBrand className="me-auto pt-xs-2 p-md-2" to="/">
          <CImage
            className="sidebar-brand-full me-2"
            src={
              currentTheme === 'cyberdrain' || preferredTheme === 'cyberdrain'
                ? raderlogo
                : raderlogolight
            }
            width={180}
            // height={60}
          />
          <CHeaderNav className="ms-2 ps-4">
            <CHeaderToggler
              className="me-2"
              onClick={() => dispatch(toggleSidebarShow({ sidebarShow }))}
            >
              <FontAwesomeIcon
                icon={sidebarShow ? faCaretSquareLeft : faCaretSquareRight}
                size="lg"
                className="me-2"
              />
            </CHeaderToggler>
          </CHeaderNav>
        </CSidebarBrand>
        <div className="d-flex align-items-center justify-content-between flex-grow-1">
          <div className="d-flex align-items-center">
            <TenantSelector />
          </div>
          <div className="d-flex align-items-center align-self-center">
            <div>
              <a
                target="_blank"
                href={`https://docs.cipp.app/user-documentation${location.pathname}`}
                className='d-flex align-items-center'
              >
                <CButton variant="ghost">
                  <FontAwesomeIcon icon={'question'} size="lg" />
                </CButton>
              </a>
            </div>
            <div
            className='d-flex align-items-center align-self-center'
            style={{ margin: '0 10px' }}
            >
              <AppHeaderSearch />
            </div>
            <div
            className='d-flex align-items-center align-self-center'
            >
              {/* <AppHeaderDropdown /> */}
            </div>
          </div>
        </div>
      </CHeader>

      {dashboard &&
        dashboard.length >= 1 &&
        dashboard.map((item, index) => (
          <>
          </>
          // <div
          //   className="mb-3"
          //   style={{ zIndex: 10000, 'padding-left': '20rem', 'padding-right': '3rem' }}
          // >
          //   <CAlert key={index} color={item.type} variant dismissible>
          //     {item.Alert} <CAlertLink href={item.link}>Link</CAlertLink>
          //   </CAlert>
          // </div>
        ))}
    </>
  )
}

export default AppHeader