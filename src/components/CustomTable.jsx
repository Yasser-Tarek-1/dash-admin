import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Stack, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";

const CustomTable = ({ headers, rows, title }) => {
  return (
    <>
      <Typography component="h3" sx={{ fontSize: "26px", fontWeight: 600 }}>
        {title}
      </Typography>
      <Box sx={{ overflow: "auto", height: "600px" }}>
        <Box
          sx={{
            width: "100%",
            display: "table",
            tableLayout: "fixed",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#131921",
                  }}
                >
                  <TableCell sx={{ color: yellow[800], fontWeight: 500 }}>
                    sNO
                  </TableCell>
                  {headers?.map((header, idx) => (
                    <TableCell
                      sx={{ color: yellow[800], fontWeight: 500 }}
                      key={idx}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length != 0 ? (
                  rows.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {idx + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          gap={"8px"}
                        >
                          <span
                            style={{
                              width: "16px",
                              height: "16px",
                              display: "block",
                              borderRadius: "50%",
                              backgroundColor: row.name,
                            }}
                          ></span>
                          {console.log(row.action)}
                          {row.name}
                        </Stack>
                      </TableCell>
                      {row?.category && <TableCell>{row.category}</TableCell>}
                      {row?.brand && <TableCell>{row.brand}</TableCell>}
                      {row?.quantity && <TableCell>{row.quantity}</TableCell>}
                      {row?.price && <TableCell>${row.price}</TableCell>}
                      {row?.email && <TableCell>{row.email}</TableCell>}
                      {row?.mobile && <TableCell>{row.mobile}</TableCell>}
                      {row?.comment && <TableCell>{row?.comment}</TableCell>}
                      {row?.status && <TableCell>{row?.status}</TableCell>}
                      {row?.product && <TableCell>{row?.product}</TableCell>}
                      {row?.amount && <TableCell>{row?.amount}</TableCell>}
                      {row?.discount && <TableCell>${row?.discount}</TableCell>}
                      {/* {row?.numViews && <TableCell>{row?.numViews}</TableCell>} */}
                      {row?.date && <TableCell>{row?.date}</TableCell>}
                      {row?.action && <TableCell>{row?.action}</TableCell>}
                    </TableRow>
                  ))
                ) : (
                  <Box sx={{ p: "16px 8px" }}>No Data yet!</Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default CustomTable;
