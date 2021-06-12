import React from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar as MaterialToobar,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ReactComponent as MainLogo } from 'images/university-logo.svg'

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <LinkLogo to='/'>
            <Logo />
          </LinkLogo>
        </LogoContainer>
        <Typography variant='h6'>
          Universidades do Brasil
        </Typography>
      </Toolbar>
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
  margin-right: 5px;
`

const LinkLogo = styled(Link)`
  display: inline-block
`

const Logo = styled(MainLogo)`
  height: 30px;
  width: 30px;

  & path {
    fill: ${({ theme }) => theme.palette.common.white};
  }

  & line {
    stroke: ${({ theme }) => theme.palette.common.white};
  }
`

export default Header
