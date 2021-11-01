const fetch = require("node-fetch")

exports.sourceNodes = async (
  { actions: { createNode, createPage }, createNodeId, createContentDigest },
  options
) => {
  const places = await fetch(
    "https://open-api.myhelsinki.fi/v1/places/?limit=100"
  )
    .then(res => res.json())
    .then(res => res.data)

  return places.map(p => {
    createNode({
      ...p,
      id: createNodeId(p.id),
      internal: {
        type: `Place`,
        contentDigest: createContentDigest(p),
      },
    })

    createPage({
      path: `/place/${p.id}`,
      component: require.resolve("./src/templates/pagination.tsx"),
      context: {},
      defer: true,
    })
  })
}
