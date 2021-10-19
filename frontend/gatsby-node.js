const { paginate } = require('gatsby-awesome-pagination')
const axios = require('axios')

const getPlaces = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/places')
    return response.data
  } catch (error) {
    console.log('error', error)
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const places = await getPlaces()
  console.log('places', places)
  const placesPerPage = 10
  const numPages = Math.ceil(places.data.length / placesPerPage)

  places.data.forEach((p, i) => {
    createPage({
      path: p.id,
      component: path.resolve('./src/components/Place'),
      context: {
        limit: placesPerPage,
        skip: i * placesPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
