import { Grid, Chip, Button, FormGroup, Typography, ButtonGroup, Slide } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useDatabase } from 'hooks'
import React, { useState, useRef } from 'react'
import { H4, Content, PaperContainer, TextField, Snackbar } from 'ui'

function SlideTransition (props) {
  return <Slide {...props} direction='up' />
}

const Update = ({ location, history }) => {
  const domainInputRef = useRef()
  const webPageInputRef = useRef()

  const { updateUniversity } = useDatabase()

  const [university, setUniversity] = useState(location.state.university)

  const [snackBar, setSnackBar] = useState(() => ({
    open: false,
    success: false,
    message: ''
  }))

  const handleCloseSnackbar = () => {
    setSnackBar({
      open: false,
      success: false,
      message: ''
    })
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUniversity(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleDeleteDomain = (index) => (e) => {
    const tempDomains = university.domains
    tempDomains.splice(index, 1)
    setUniversity(prevState => ({
      ...prevState,
      domains: tempDomains
    }))
  }

  const handleDeleteWebPages = (index) => (e) => {
    const tempWebPages = university.web_pages
    tempWebPages.splice(index, 1)
    setUniversity(prevState => ({
      ...prevState,
      web_pages: tempWebPages
    }))
  }

  const handleAddDomain = (e) => {
    const domain = domainInputRef.current.value
    if (domain != '') {
      const tempDomains = university.domains
      tempDomains.push(domain)
      setUniversity(prevState => ({
        ...prevState,
        domains: tempDomains
      }))
    }
    domainInputRef.current.value = null
  }

  const handleAddWebPage = (e) => {
    const webPage = webPageInputRef.current.value
    if (webPage != '') {
      const tempWebPages = university.web_pages
      tempWebPages.push(webPage)
      setUniversity(prevState => ({
        ...prevState,
        web_pages: tempWebPages
      }))
    }
    webPageInputRef.current.value = null
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    updateUniversity(university).then(response => {
      if (response.status === 200) {
        setSnackBar({
          open: true,
          success: true,
          message: 'Universidade atualizada com sucesso'
        })
      }
    }).catch(err => {
      setSnackBar({
        open: true,
        success: false,
        message: 'Erro ao atualizar universidade'
      })
    })
  }

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} justify='center'>
          <Grid item md={10} sm={10} xs={12}>
            <PaperContainer>
              <H4>Atualizar universidade</H4>
              <Grid container spacing={4} justify='center'>
                <Grid item md={6} sm={6} xs={12}>
                  <TextField
                    name='name'
                    onChange={handleChange}
                    label='Nome da universidade'
                    value={university.name}
                    required
                  />
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    name='state_province'
                    onChange={handleChange}
                    value={university.state_province}
                    label='Estado'
                  />
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                  <Grid container justify='center' alignItems='center' direction='column'>
                    <FormGroup row>
                      <TextField
                        name='name'
                        label='Domínio'
                        inputRef={domainInputRef}
                      />
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleAddDomain}
                      >+
                      </Button>
                    </FormGroup>
                    <Typography variant='h6'>Domínios: </Typography>
                  </Grid>
                  <Grid container spacing={1} justify='center'>
                    {university && (
                      university.domains.map((domain, index) => (
                        <Grid item key={index}>
                          <Chip
                            label={domain}
                            color='secondary'
                            size='small'
                            onDelete={handleDeleteDomain(index)}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                  <Grid container justify='center' alignItems='center' direction='column'>
                    <FormGroup row>
                      <TextField
                        name='name'
                        inputRef={webPageInputRef}
                        label='Página web'
                      />
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleAddWebPage}
                      >+
                      </Button>
                    </FormGroup>
                    <Typography variant='h6'>Páginas web:</Typography>
                  </Grid>
                  <Grid container spacing={1} justify='center'>
                    {university && (
                      university.web_pages.map((webPage, index) => (
                        <Grid item key={index}>
                          <Chip
                            label={webPage}
                            color='secondary'
                            size='small'
                            onDelete={handleDeleteWebPages(index)}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
                <Grid container item spacing={1} justify='center'>
                  <ButtonGroup disableElevation variant='contained' color='primary'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='secondary'
                    >Atualizar
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => { history.goBack() }}
                    >Voltar
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </PaperContainer>
            <Snackbar
              open={snackBar.open}
              onClose={handleCloseSnackbar}
              TransitionComponent={SlideTransition}
              autoHideDuration={3000}
              key={snackBar.message}
            >
              <Alert variant='filled' severity={snackBar.success ? 'success' : 'error'}>
                {snackBar.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </form>
    </Content>
  )
}

export default Update
