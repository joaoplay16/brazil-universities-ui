import React, { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'services'
const DatabaseContext = createContext()

const UNIVERSITIES = '/search'
const NEW_UNIVESITY = '/new'
const UPDATE_UNIVERSITY = '/update/'
const DELETE_UNIVERSITY = '/remove/'

function DatabaseProvider ({ children }) {
  const [universities, setUniversities] = useState(() => [])
  const [responseSaveUniversity, setUniversity] = useState(() => ({}))

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

  const updateUniversity = (university) => {
    return api.put(UPDATE_UNIVERSITY + university._id, university)
      .then((response) => {
        return response
      })
  }

  const deleteUniversity = (university) => {
    return api.delete(DELETE_UNIVERSITY + university._id)
      .then((response) => {
        return response
      })
  }

  return (
    <DatabaseContext.Provider
      value={{
        universities,
        fetchUniversities,
        addUniversity,
        updateUniversity,
        deleteUniversity,
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
