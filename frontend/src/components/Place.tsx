import React from 'react'
import { graphql } from 'gatsby'

function Place(props) {
  console.log('props', props)
  return <div></div>
}

export default Place

// export const pageQuery = graphql`
//   query ($skip: Int!, $limit: Int!) {
//     placeData(skip: $skip, limit: $limit)
//   }
// `
