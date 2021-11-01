import * as React from "react"
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
  Paper,
  Typography,
  Skeleton,
} from "@mui/material"
import { v4 } from "uuid"

export type Resource = {
  id: string
}

export type Column<T> = {
  label: string
  render?: (value: T) => React.ReactNode
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[] | undefined
  count: number | undefined
  loading?: boolean
  rowsPerPage: number
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function GenericTable<T extends Resource>({
  columns,
  data,
  count,
  rowsPerPage = 10,
  page,
  loading,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableProps<T>) {
  const loader = () => {
    const skeletons = new Array(rowsPerPage).fill(undefined).map(() => (
      <TableRow key={v4()}>
        {new Array(columns.length).fill(undefined).map(() => (
          <TableCell key={v4()}>
            <Skeleton variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ))

    return skeletons
  }
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(c => (
                <TableCell key={c.label}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {c.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? loader()
              : data?.map(element => (
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
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default GenericTable
