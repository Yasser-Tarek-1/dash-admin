import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomTable = ({ headers, rows, title }) => {
  return (
    <>
      <Typography component="h3" sx={{ fontSize: "26px", fontWeight: 600 }}>
        {title}
      </Typography>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>Dessert (100g serving)</TableCell> */}
                  {headers?.map((header, idx) => (
                    <TableCell key={idx}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {row?.category && <TableCell>{row.category}</TableCell>}
                    {row?.brand && <TableCell>{row.brand}</TableCell>}
                    {row?.quantity && <TableCell>{row.quantity}</TableCell>}
                    {row?.price && <TableCell>${row.price}</TableCell>}
                    {row?.email && <TableCell>{row.email}</TableCell>}
                    {row?.mobile && <TableCell>{row.mobile}</TableCell>}
                    <TableCell>
                      <IconButton>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default CustomTable;
