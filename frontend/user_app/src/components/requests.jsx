import React from "react";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import Check from '../../images/Check.svg';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorIcon from '@mui/icons-material/Error';
import FunctionsIcon from '@mui/icons-material/Functions';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function requests() {
    return (
        <Grid container sx={{ width: "70vw", marginRight: "auto", marginLeft: "auto" }} justifyContent="center">
            <Grid xs={6}>
                <Card sx={{ p: 4, backgroundColor: "#d9d9d9", }}>
                    <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={2}
                    >
                        <img src={Check} width="90%" style={{ marginTop: 2 }} />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#09ad58",
                                fontWeight: 400,
                                ":hover": {
                                    backgroundColor: "#09914b",
                                }
                            }}>
                            <Link to='/admin/requests' style={{textDecoration: 'none', color:'#fff'}}>Check Requests</Link>
                        </Button>
                    </Stack>
                </Card>
            </Grid>
            <Grid container xs={6} justifyContent="flex-end">
                <Grid container xs={6} justifyContent="flex-end">
                    <Card sx={{ p: 2, backgroundColor: "#4c4c4c", width: "70%" }}>

                        <Grid container>
                            <Grid xs={10}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 400,
                                        fontFamily: "Segoe UI",
                                        color: "#fff"
                                    }}>
                                    Verified
                                </Typography>

                            </Grid>
                            <Grid xs={2}>
                                <CheckCircleRoundedIcon sx={{ color: "#fff" }} />
                            </Grid>
                            <Grid mt={2}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: "#fff"
                                    }}
                                >
                                    23
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid container xs={6} justifyContent="flex-end">
                    <Card sx={{ p: 2, backgroundColor: "#4c4c4c", width: "70%" }}>
                        <Grid container>
                            <Grid xs={10}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 400,
                                        fontFamily: "Segoe UI",
                                        color: "#fff"
                                    }}>
                                    Need Verification
                                </Typography>

                            </Grid>
                            <Grid xs={2}>
                                <ErrorIcon sx={{ color: "#fff" }} />
                            </Grid>
                            <Grid mt={2}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: "#fff"
                                    }}
                                >
                                    23
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>


                <Card sx={{ p: 2, mt: 1, backgroundColor: "#4c4c4c", width: "85%" }}>

                    <Grid container>
                        <Grid xs={11}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 400,
                                    fontFamily: "Segoe UI",
                                    color: "#fff"
                                }}>
                                Total
                            </Typography>

                        </Grid>
                        <Grid xs={1}>
                            <FunctionsIcon sx={{ color: "#fff" }} />
                        </Grid>
                        <Grid mt={2}>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: "#fff"
                                }}
                            >
                                46
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}

export default requests;
