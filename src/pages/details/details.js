import { Grid, Chip, Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { H4, H5, Content, PaperContainer } from 'ui'

const Details = ({ location, history }) => {
  const university = location.state
  useEffect(() => {
    console.log(university.domains)
  }, [])

  return (
    <Content>
      <Grid container spacing={4} justify='center'>
        <Grid item md={10} sm={10} xs={12}>
          <PaperContainer>
            <H4>{university.name}</H4>
            <H5 color='textSecondary'> Estado: {university.state_province}</H5>
            <Grid container spacing={4} justify='center'>
              <Grid item md={6} sm={6} xs={12}>
                <H5>Domínios: {university.domains.length}</H5>
                <Grid container spacing={1} justify='center' direction='row'>
                  {university && (
                    university.domains.map((domain) => (
                      <Grid item key={domain}>
                        <Chip
                          label={domain}
                          color='secondary'
                          size='small'
                        />
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <H5>Páginas web: {university.web_pages.length}</H5>
                <Grid container spacing={1} justify='center' direction='row'>
                  {university && (
                    university.web_pages.map((webPage) => (
                      <Grid item key={webPage}>
                        <Chip
                          label={webPage}
                          color='secondary'
                          size='small'
                        />
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => history.goBack()}
                >voltar</Button>
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>
      </Grid>
    </Content>
  )
}

export default Details
