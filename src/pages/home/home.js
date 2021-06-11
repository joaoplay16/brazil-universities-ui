import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDatabase } from 'hooks'
import { H5, H4, TextField, Divider } from 'ui'
import { DETAILS } from 'routes'

const Main = () => {
  const { universities, fetchUniversities } = useDatabase()
  const [params, setParams] = useState({
    pageNumber: 1,
    pagesLimit: 5,
    universityName: ''
  })

  const totalPages = universities.pages
  const currentPage = params.pageNumber

  useEffect(() => {
    fetchUniversities({ ...params })
  }, [])

  useEffect(() => {
    fetchUniversities({ ...params })
  }, [params])

  const setPage = (page) => {
    setParams(prevState => ({
      ...prevState,
      pageNumber: page
    }))
  }

  const handleChangePage = (e, value) => {
    setPage(value)
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
            <H4>Buscador de universidades do Brasil</H4>
          </Grid>
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
                  <ListLink button to={`${DETAILS}${university._id}`}>
                    <ListItemText
                      primary={university.name}
                      secondary={university.state_province}
                    />
                  </ListLink>
                  <Divider variant='inset' component='hr' />
                </React.Fragment>
              ))}
            </List>
          </Grid>

          {universities.pages > 1 && <Grid container justify='center'>
            <Pagination
              page={currentPage}
              count={totalPages}
              onChange={handleChangePage}
              color='secondary'
              variant='outlined'
            />
          </Grid>}

          {(universities.docs && universities.docs.length == 0) && <Grid item>
            <H5>Nenhuma universidade encontrada</H5>
          </Grid>}
        </Grid>
      </SearchContainer>
    </>
  )
}

const SearchContainer = styled(Grid)`
  margin-top: 30px;
`

const ListLink = styled(ListItem).attrs({
  component: Link
})`

`

export default Main
