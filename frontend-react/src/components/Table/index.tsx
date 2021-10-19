import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
  Paper,
} from '@mui/material'

export type Resource = {
  id: string
}

export type Column<T> = {
  label: string
  render?: (value: T) => React.ReactNode
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  count: number
  rowsPerPage: number
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function GenericTable<T extends Resource>({
  columns,
  data,
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableProps<T>) {
  console.log('rows per page', rowsPerPage)
  console.log('page', page)
  console.log('count', count)
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(c => (
                <TableCell key={c.label}>{c.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(element => (
              <TableRow key={element.id}>
                {columns.map(c => (
                  <TableCell key={c.label}>
                    {c.render ? c.render(element) : element}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default GenericTable
