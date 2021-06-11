import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useDatabase } from 'hooks'
import { Button, Divider, H5, TextField } from 'ui'

const Main = () => {
  const { universities, fetchUniversities } = useDatabase()
  const [params, setParams] = useState({
    pageNumber: 1,
    pageLimit: 10,
    universityName: ''
  })
  useEffect(() => {
    fetchUniversities({ ...params })
  }, [])

  useEffect(() => {
    console.log(params)
    fetchUniversities({ ...params })
  }, [params])

  const canGoToNextPage = () => {
    const totalPages = universities.pages
    const currentPage = params.pageNumber
    return currentPage < totalPages
  }

  const canGoToPreviousPage = () => {
    const currentPage = params.pageNumber
    return currentPage > 1
  }

  const nextPage = () => {
    if (canGoToNextPage()) {
      setParams(prevState => ({
        ...prevState,
        pageNumber: prevState.pageNumber + 1
      }))
    }
  }

  const previousPage = () => {
    if (canGoToPreviousPage()) {
      setParams(prevState => ({
        ...prevState,
        pageNumber: prevState.pageNumber - 1
      }))
    }
  }

  const handleSearch = (e) => {
    const universityName = e.target.value
    setParams(prevState => ({
      ...prevState,
      pageNumber: 1,
      universityName: universityName
    }))
  }

  return (
    <>
      <SearchContainer container justify='center'>
        <Grid item sm={10} lg={8} md={8} xs={11}>
          <Grid item>
            <TextField
              label='Buscar universidade'
              variant='outlined'
              onChange={handleSearch}
            />
          </Grid>
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

          {universities.pages > 1 && <Grid container justify='center'>
            <Button
              variant='outlined'
              color='primary'
              disabled={!canGoToPreviousPage()}
              onClick={previousPage}
            >Anterior
            </Button>

            <H5> pagina {params.pageNumber} de {universities.pages} </H5>
            <Button
              variant='outlined'
              color='primary' disabled={!canGoToNextPage()}
              onClick={nextPage}
            >Proximo
            </Button>
          </Grid>}
        </Grid>
      </SearchContainer>
    </>
  )
}

const SearchContainer = styled(Grid)`
  margin-top: 30px;
`

export default Main
