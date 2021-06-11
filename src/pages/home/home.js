import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useDatabase } from 'hooks'
import { Button, Divider, H5 } from 'ui'

const Main = () => {
  const { universities, fetchUniversities } = useDatabase()
  const [params, setPage] = useState({
    page: 1
  })
  useEffect(() => {
    console.log(params)
    fetchUniversities({ ...params })
  }, [])

  useEffect(() => {
    console.log(params)
    fetchUniversities({ ...params })
  }, [params])

  const canGoToNextPage = () => {
    const totalPages = universities.pages
    const currentPage = params.page
    return currentPage < totalPages
  }

  const canGoToPreviousPage = () => {
    const currentPage = params.page
    return currentPage > 1
  }

  const nextPage = () => {
    if (canGoToNextPage()) {
      setPage(prevState => ({
        page: prevState.page + 1
      }))
    }
  }

  const previousPage = () => {
    if (canGoToPreviousPage()) {
      setPage(prevState => ({
        page: prevState.page - 1
      }))
    }
  }

  return (
    <>
      <Grid container justify='center'>
        <Grid item sm={10} lg={8} md={6} xs={12}>
          <Grid item>
            <List component='nav' xs={12}>
              {universities.docs && universities.docs.map((university) => (
                <React.Fragment key={university._id}>
                  <ListItem
                    alignItems='center'
                  >
                    <ListItemText
                      primary={university.name}
                      secondary={university.state_province}
                    />

                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Grid>

          <Grid container justify='center'>
            <Button
              variant='outlined'
              color='primary'
              disabled={!canGoToPreviousPage()}
              onClick={previousPage}
            >Anterior
            </Button>

            <H5> pagina {params.page} de {universities.pages} </H5>
            <Button
              variant='outlined'
              color='primary' disabled={!canGoToNextPage()}
              onClick={nextPage}
            >Proximo
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Main
