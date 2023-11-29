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
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

const columns = [
  { id: "nic", label: "NIC", minWidth: 120 },
  {
    id: "address",
    label: "Address",
    minWidth: 400,
  },
  {
    id: "more",
    label: "Document",
    minWidth: 100,
  },

  {
    id: "Accept",
    label: "Accept",
    minWidth: 60,
  },

  {
    id: "Reject",
    label: "Reject",
    minWidth: 60,
  },
];

export default function StickyHeadTable() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = "10";
  const [rows, setRows] = useState([]);
  const [clickedImage, setClickedImage] = useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("API_TOKEN"),
    },
  };

  const handleOpen = (index) => {
    setClickedImage(rows[index][2]);
    console.log(rows[index][2]);
    console.log("rows[index][2]");
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const updateData = (nic) => {
    const newRows = rows.filter((row) => row[0] != nic);
    setRows(newRows);
  };

  useEffect(() => {
    const gramaArea = localStorage.getItem("area");

    Axios.get(
      "https://8659e866-c03e-45d5-a713-14c3f8f0d831-dev.e1-us-east-azure.choreoapis.dev/vjmx/therealaddresscheckapi/1.0.0/requests/" +
        gramaArea +
        "?status=Processing",
      config
    )
      .then((res) => {
        console.log(res.data[0]);
        const arr = res.data.map((row) => [row.nic, row.address, row.proof]);
        setRows(arr);
      })
      .catch();
  }, []);

  const handleAccept = (nic) => {
    const url =
      "https://8659e866-c03e-45d5-a713-14c3f8f0d831-dev.e1-us-east-azure.choreoapis.dev/vjmx/therealaddresscheckapi/1.0.0/confirm/" +
      nic;

    Axios.put(url, {}, config)
      .then((res) => {
        console.log(res);
        if (res.status == 201) updateData(nic);
      })
      .catch();
  };

  const handleReject = (nic) => {
    const url =
      "https://8659e866-c03e-45d5-a713-14c3f8f0d831-dev.e1-us-east-azure.choreoapis.dev/vjmx/therealaddresscheckapi/1.0.0/missing/" +
      nic;

    Axios.put(url, {}, config)
      .then((res) => {
        console.log(res);
        if (res.status == 201) updateData(nic);
      })
      .catch();
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
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                  <TableCell
                    align="left"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(index)}
                  >
                    <ArticleIcon
                      fontSize="large"
                      sx={{
                        color: "#757575",
                        ":hover": {
                          color: "#1188f0",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAccept(row[0])}
                  >
                    <CheckIcon
                      fontSize="large"
                      sx={{
                        color: "#757575",
                        ":hover": {
                          color: "#09914b",
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleReject(row[0])}
                  >
                    <DangerousIcon
                      fontSize="large"
                      sx={{
                        color: "#757575",
                        ":hover": {
                          color: "#cf0404",
                        },
                      }}
                    />
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
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Model open={open} setOpen={setOpen} base64Image={clickedImage} />
    </Paper>
  );
}
