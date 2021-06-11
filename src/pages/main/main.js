import React, { lazy, Suspense } from 'react'
import {
  withStyles
} from '@material-ui/core'
import Header from './header'
import { HOME, DETAILS } from 'routes'
import { Route, Switch } from 'react-router'

const Home = lazy(
  () => import('pages/home')
)

const Details = lazy(
  () => import('pages/details')
)

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback='Loading'>
        <Switch>
          <Route path={HOME} exact component={Home} />
          <Route path={`${DETAILS}:id`} component={Details} />
        </Switch>
      </Suspense>
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
