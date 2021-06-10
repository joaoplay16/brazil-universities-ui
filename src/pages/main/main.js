import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import Header from './header'
import { Content } from 'ui'

const Home = React.lazy(
  () => import('pages/main')
)

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Content>
        <h1>ok</h1>

      </Content>
    </>
  )
}

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Main
