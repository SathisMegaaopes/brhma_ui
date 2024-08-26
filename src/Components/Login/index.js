import * as React from 'react';
import axios from 'axios';
import URL from "../Global/Utils/url_route";
import { Grid, TextField, Card, CardContent, Box, CardHeader, CardMedia, Button, Container } from "@mui/material"
import logo1 from "../../images/logo_3.png";
import { useNavigate } from 'react-router-dom';




function MOSLogin() {
  const [user_name, setUser_name] = React.useState("");
  const [user_pwd, setUser_pwd] = React.useState("");
  const [errorMsg, setError] = React.useState("");
  const history = useNavigate();
  const handleValidate = () => {
    let request = { "user_name": user_name, "user_pwd": user_pwd };

    let url = URL + "login/validateUser";
    axios.post(url, request)
      .then((response) => {
        if (response.data.status === 0) {

          const user_info = response.data.data[0];
          sessionStorage.setItem("user_info", JSON.stringify(user_info));
          history("/dashboard");

        }
        else {

          setError(response.data.message)
        }
      }).catch(function (error) {
        console.log(error);
      });
  }


  return (
    <Container maxWidth="md">
      <Grid container spacing={2} direction="row"
        justifyContent="center"
        alignItems="center" >

        <Grid item xs={12} sm={5} md={5} lg={5}>
          <Card variant="outlined" style={{ backgroundColor: 'transparent', marginTop: '35%' }}>

            <CardMedia
              component="img"
              image={logo1}
              alt="Brhma"
              height="200"
            />
            <CardContent>
              <Box style={{ margin: "10px" }}>
                <TextField fullWidth id="user_name" label="User Name"
                  variant="outlined" size="small" required onChange={e => setUser_name(e.target.value)}
                />
              </Box>
              <Box style={{ margin: "10px" }}>
                <TextField fullWidth id="user_pwd" label="Password"
                  variant="outlined" type='password' size="small" required onChange={e => setUser_pwd(e.target.value)}
                />
              </Box>
              <Box style={{ margin: "10px", color: "red" }} visibility={errorMsg === "" ? "hidden" : "visible"}>
                {errorMsg}
              </Box>
              <Box style={{ margin: "10px" }}>
                <Button variant='contained'
                  color='info'
                  disableElevation
                  fullWidth
                  disabled={user_name === "" || user_pwd === ""}
                  onClick={handleValidate}
                  sx={{ backgroundColor: "#272727" }}>
                  LOGIN
                </Button>
              </Box>


            </CardContent>
          </Card>



        </Grid>
      </Grid>
    </Container>
  )

};
export default MOSLogin;