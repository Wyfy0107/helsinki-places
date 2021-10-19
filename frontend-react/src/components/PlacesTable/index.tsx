import { useState } from 'react'
import { Typography } from '@mui/material'

import { convert } from '../../util'
import { Place } from '../../types'
import GenericTable, { Column } from '../Table'
import usePlaces from '../../hooks/usePlaces'
import ErrorPage from '../Error'

const today = new Date().toLocaleString('en-us', { weekday: 'long' })
const now = new Date().toISOString()

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
].map((d, i) => ({ name: d, id: i + 1 }))

const columns: Column<Place>[] = [
  {
    label: 'Name',
    render: (value: Place) => <Typography>{value.name.en}</Typography>,
  },
  {
    label: 'Address',
    render: (value: Place) => (
      <Typography>{value.location.address.street_address}</Typography>
    ),
  },
  {
    label: 'Opening Hours',
    render: (value: Place) => {
      const dayId = weekdays.find(wd => wd.name === today)?.id
      const openingHours = value.opening_hours.hours?.find(
        h => h.weekday_id === dayId
      )?.opens

      return (
        <Typography>
          {openingHours ? `Today at ${openingHours}` : 'N/A'}
        </Typography>
      )
    },
  },
  {
    label: 'Status',
    render: (value: Place) => {
      const dayId = weekdays.find(wd => wd.name === today)?.id
      const closingHours = value.opening_hours.hours?.find(
        h => h.weekday_id === dayId
      )?.closes

      let isOpen = true
      const closingISO = convert(closingHours)
      const diff = closingISO - Number(now)
      if (diff <= 0) {
        isOpen = false
      }

      return (
        <Typography>
          {!closingHours ? 'N/A' : isOpen ? 'Opening' : 'Closed'}
        </Typography>
      )
    },
  },
]

function PlacesTable() {
  const [pagination, setPagination] = useState({ page: 0, limit: 10 })
  const [allPlaces, loading, error] = usePlaces(pagination)

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

  if (error) {
    return <ErrorPage />
  }

  return (
    <>
      <GenericTable<Place>
        columns={columns}
        data={allPlaces?.data}
        page={pagination.page}
        loading={loading}
        rowsPerPage={pagination.limit}
        count={Number(allPlaces?.meta.count)}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

export default PlacesTable
