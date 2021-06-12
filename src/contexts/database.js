import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'services'
const DatabaseContext = createContext()

const UNIVERSITIES = '/search'
const NEW_UNIVESITY = '/new'

function DatabaseProvider ({ children }) {
  const [universities, setUniversities] = useState(() => [])
  const [responseSaveUniversity, setUniversity] = useState(() => [])

  const fetchUniversities = async (params) => {
    const result = await api.get(UNIVERSITIES, { params })
    setUniversities(result.data)
  }

  const addUniversity = (university) => {
    api.post(NEW_UNIVESITY, university)
      .then((response) => {
        setUniversity(response)
      }).catch(err => {
        setUniversity(err.response)
      })
  }

  return (
    <DatabaseContext.Provider
      value={{
        universities,
        fetchUniversities,
        addUniversity,
        responseSaveUniversity
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { DatabaseProvider, DatabaseContext }
