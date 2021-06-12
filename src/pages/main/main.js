import React, { lazy, Suspense } from 'react'
import {
  withStyles
} from '@material-ui/core'
import Header from './header'
import { HOME, DETAILS, NEW } from 'routes'
import { Route, Switch } from 'react-router'

const Home = lazy(
  () => import('pages/home')
)

const Details = lazy(
  () => import('pages/details')
)

const New = lazy(
  () => import('pages/new')
)

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback='Loading'>
        <Switch>
          <Route path={HOME} exact component={Home} />
          <Route path={NEW} component={New} />
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
