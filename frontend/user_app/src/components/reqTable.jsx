import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ArticleIcon from "@mui/icons-material/Article";
import Stack from "@mui/material/Stack";
import Model from "../components/Model";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

const columns = [
  { id: "Request ID", label: "Request ID", minWidth: "25%",maxWidth: "25%" },
  { id: "nic", label: "NIC", minWidth: "25%",maxWidth: "25%" },
  {
    id: "address",
    label: "Address",
    minWidth: "40%"
    ,maxWidth: "40%"
  },
  {
    id: "more",
    label: "",
    minWidth: "10%",
    maxWidth: "10%"
  },
];

const generateDummyData = () => {
  const data = [];
  for (let i = 1; i <= 4; i++) {
    const req_id = `Req${i}`;
    const nic = `NIC${i}`;
    const address = `Address ${i}`;
    const proof = `Base64EncodedImage${i}`; // Replace with your actual base64 image
    data.push([req_id,nic, address, proof]);
  }
  return Promise.resolve(data);
};

export default function StickyHeadTable() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = "10";
  const [rows, setRows] = useState([]);
  const [clickedImage, setClickedImage] = useState("");

  // const handleOpen = (index) => {
  //   // setClickedImage(rows[index][2]);
  //   // setOpen(true);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const updateData = (nic) => {
    const newRows = rows.filter((row) => row[0] !== nic);
    setRows(newRows);
  };

  useEffect(() => {
    generateDummyData().then((data) => setRows(data));
  }, []);

  const handleAccept = (nic) => {
    // Implement your logic for handling acceptance
    updateData(nic);
  };

  const handleReject = (nic) => {
    // Implement your logic for handling rejection
    updateData(nic);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "auto", boxShadow: 5 }}>
      <TableContainer
        sx={{
          maxHeight: 750,
          width: "100%",
          display: "table",
          tableLayout: "fixed",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth , maxWidth:column.maxWidth}}
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row[0]}</TableCell>
                  <TableCell align="left">{row[1]}</TableCell>
                  <TableCell align="left">{row[2]}</TableCell>
                  <TableCell
                    align="right"
                    style={{ cursor: "pointer" }}
                    // onClick={() => handleOpen(index)}
                  >
                  <Link href="/admin/request_details/1">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#699eee",
                        ":hover": {
                          backgroundColor: "#699eee",
                        },
                        fontSize: {
                          xs: 12,
                          sm: 14,
                          md: 15,
                        },
                        textTransform: "none",
                      } }
                    >
                      View more
                    </Button>
                  </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      <Model open={open} setOpen={setOpen} base64Image={clickedImage} />
    </Paper>
  );
}
