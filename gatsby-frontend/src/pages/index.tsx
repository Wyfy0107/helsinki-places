import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Typography } from "@mui/material"

import DataTable, { Column } from "../components/DataTable"
import { Place } from "../types"

const today = new Date().toLocaleString("en-us", { weekday: "long" })
export const convert = (hour: string | null | undefined) => {
  const date = new Date().toLocaleDateString("en-US").replace(/\//g, "-")
  return `${date} ${hour}`
}

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].map((d, i) => ({ name: d, id: i + 1 }))

const columns: Column<Place>[] = [
  {
    label: "Name",
    render: (value: Place) => <Typography>{value.name.en}</Typography>,
  },
  {
    label: "Address",
    render: (value: Place) => (
      <Typography>{value.location.address.street_address}</Typography>
    ),
  },
  {
    label: "Opening Hours",
    render: (value: Place) => {
      const dayId = weekdays.find(wd => wd.name === today)?.id
      const openingHours = value.opening_hours.hours?.find(
        h => h.weekday_id === dayId
      )?.opens

      return (
        <Typography>
          {openingHours ? `Today at ${openingHours}` : "N/A"}
        </Typography>
      )
    },
  },
  {
    label: "Status",
    render: (value: Place) => {
      const dayId = weekdays.find(wd => wd.name === today)?.id
      const closingHours = value.opening_hours.hours?.find(
        h => h.weekday_id === dayId
      )?.closes

      let isOpen = true
      const closing = new Date(convert(closingHours))
      const now = new Date()

      if (now > closing) {
        isOpen = false
      }

      return (
        <Typography>
          {!closingHours ? "N/A" : isOpen ? "Opening" : "Closed"}
        </Typography>
      )
    },
  },
]

type Node = {
  node: Place
}

type Props = {
  data: {
    allPlace: {
      edges: Node[]
    }
  }
}

const IndexPage = ({ data }: Props) => {
  const [pagination, setPagination] = useState({ page: 0, limit: 10 })
  const places = data.allPlace.edges.map(e => e.node)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination({ ...pagination, page: newPage })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagination({
      ...pagination,
      page: 0,
      limit: parseInt(event.target.value, 10),
    })
  }

  return (
    <DataTable<Place>
      columns={columns}
      data={places}
      page={pagination.page}
      rowsPerPage={pagination.limit}
      count={places.length}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

export default IndexPage

export const query = graphql`
  query MyQuery {
    allPlace {
      edges {
        node {
          id
          name {
            en
            fi
            sv
            zh
          }
          location {
            lat
            lon
            address {
              locality
              postal_code
              street_address
            }
          }
          opening_hours {
            openinghours_exception
            hours {
              closes
              open24h
              opens
              weekday_id
            }
          }
        }
      }
    }
  }
`
