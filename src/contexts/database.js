import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'services'
const DatabaseContext = createContext()

const UNIVERSITIES = '/search'
const NEW_UNIVESITY = '/new'
const UPDATE_UNIVERSITY = '/update/'
const DELETE_UNIVERSITY = '/remove/'

function DatabaseProvider ({ children }) {
  const [universities, setUniversities] = useState(() => [])

  const fetchUniversities = async (params) => {
    const result = await api.get(UNIVERSITIES, { params })
    setUniversities(result.data)
  }

  const addUniversity = (university) => {
    return api.post(NEW_UNIVESITY, university)
      .then((response) => {
        return response
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
