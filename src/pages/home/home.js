import { Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDatabase } from 'hooks'
import { H5, H4, TextField, Divider, Dialog, Snackbar } from 'ui'
import { DETAILS, UPDATE } from 'routes'

const Home = () => {
  const { universities, fetchUniversities, deleteUniversity } = useDatabase()
  const [params, setParams] = useState({
    pageNumber: 1,
    pagesLimit: 10,
    universityName: ''
  })

  const [universityToDelete, setUniversityToDelete] = useState(() => { })

  const [showDeleteDialog, setDeleteDialog] = useState(false)

  const [snackBar, setSnackBar] = useState(() => ({
    open: false,
    success: false,
    message: ''
  }))

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

  const handleDeleteUniversity = (e) => {
    deleteUniversity(universityToDelete).then(response => {
      fetchUniversities()
      setSnackBar({
        open: true,
        success: true,
        message: 'Universidade removida com sucesso!'
      })
    }).catch(err => {
      setSnackBar({
        open: true,
        success: false,
        message: 'Houve um erro ao remover a universidade selecionada'
      })
    })
    setDeleteDialog(false)
  }

  const handleCloseSnackbar = () => {
    setSnackBar({
      open: false,
      success: false,
      message: ''
    })
  }

  const handleShowDeleteDialog = (university) => (e) => {
    setDeleteDialog(true)
    setUniversityToDelete(university)
  }

  const handleCloseDeleteDialog = (e) => {
    setDeleteDialog(false)
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
                  <ListLink
                    button to={{
                      pathname: `${DETAILS}${university._id}`,
                      state: university
                    }}
                  >
                    <ListItemText
                      primary={university.name}
                      secondary={university.state_province}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        color='secondary'
                        onClick={handleShowDeleteDialog(university)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color='secondary'
                        to={{
                          pathname: `${UPDATE}${university._id}`,
                          state: {
                            university
                          }
                        }}
                        component={Link}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
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

          <Dialog
            open={showDeleteDialog}
            onClose={handleCloseDeleteDialog}
            onClickOk={handleDeleteUniversity}
            title='Remover universidade'
            content={`Remover ${universityToDelete && universityToDelete.name}?`}
            okText='sim'
            cancelText='cancelar'
          />
          <Snackbar
            open={snackBar.open}
            success={snackBar.success}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackBar.message}
            key={snackBar.message}
          />
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

export default Home
