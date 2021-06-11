import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'services'
const DatabaseContext = createContext()

const UNIVERSITIES = '/search'

function DatabaseProvider ({ children }) {
  const [universities, setUniversities] = useState(() => [])

  const fetchUniversities = async (params) => {
    const result = await api.get(UNIVERSITIES, { params })
    console.log(result)
    setUniversities(result.data)
  }

  return (
    <DatabaseContext.Provider
      value={{
        universities,
        fetchUniversities
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
