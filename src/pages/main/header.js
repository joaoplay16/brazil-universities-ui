import React from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar as MaterialToobar
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <AppBar>
      <Toolbar />
    </AppBar>
  )
}

const Toolbar = styled(MaterialToobar)`
  &&{
  margin: 0 auto;
  max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
  width: 100%;
  }
`

const LogoContainer = styled.div`
  flex-grow: 1;
`

const LinkLogo = styled(Link)`
  display: inline-block
`

export default Header
