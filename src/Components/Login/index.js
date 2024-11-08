import * as React from 'react';
import axios from 'axios';
import URL from "../Global/Utils/url_route";
import { Grid, TextField, Card, CardContent, Box, CardHeader, CardMedia, Button, Container, Typography, Paper, CssBaseline } from "@mui/material"
import logo1 from "../../images/logo_3.png";
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function MOSLogin() {
  const [user_name, setUser_name] = React.useState("");
  const [user_pwd, setUser_pwd] = React.useState("");
  const [errorMsg, setError] = React.useState("");
  const history = useNavigate();


  const handleValidate = () => {
    let request = { "user_name": user_name, "user_pwd": user_pwd, "type": "login" };

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

  const apiCallOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleValidate();
    }
  }

  const apiCallonButton = () => {
    handleValidate();
  }

  return (

    // <Container maxWidth="md">
    //   <Grid container spacing={2} direction="row"
    //     justifyContent="center"
    //     alignItems="center" >

    //     <Grid item xs={12} sm={5} md={5} lg={5}>
    //       <Card variant="outlined" style={{ backgroundColor: 'transparent', marginTop: '35%' }}>

    //         <CardMedia
    //           component="img"
    //           image={logo1}
    //           alt="Brhma"
    //           height="200"
    //         />
    //         <CardContent>
    //           <Box style={{ margin: "10px" }}>
    //             <TextField fullWidth id="user_name" label="User Name"
    //               variant="outlined" size="small" required onChange={e => setUser_name(e.target.value)}
    //             />
    //           </Box>
    //           <Box style={{ margin: "10px" }}>
    //             <TextField fullWidth id="user_pwd" label="Password"
    //               variant="outlined" type='password' size="small" required onChange={e => setUser_pwd(e.target.value)}
    //             />
    //           </Box>
    //           <Box style={{ margin: "10px", color: "red" }} visibility={errorMsg === "" ? "hidden" : "visible"}>
    //             {errorMsg}
    //           </Box>
    //           <Box style={{ margin: "10px" }}>
    //             <Button variant='contained'
    //               color='info'
    //               disableElevation
    //               fullWidth
    //               disabled={user_name === "" || user_pwd === ""}
    //               onClick={handleValidate}
    //               sx={{ backgroundColor: "#272727" }}
    //             >
    //               LOGIN
    //             </Button>
    //           </Box>


    //         </CardContent>
    //       </Card>



    //     </Grid>
    //   </Grid>
    // </Container>



    <Grid container sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '' }}>
        <Box
          sx={{
            height: '70vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <DotLottieReact
            src="/loginscren.json"
            loop
            autoplay
          />


        </Box>
        <Typography variant="h2" align="center">
        </Typography>

        <CardMedia
          component="img"
          image={logo1}
          alt="Brhma"
          height="200"
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 100,
            height: 100,
          }}
        />
      </Grid>


      <Grid item xs={6} sx={{ height: '100%', backgroundColor: '#4c6fbf', }}>

        <Grid item >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              height: '100%',
              backgroundColor: '#4c6fbf',
              paddingTop: 12,
            }}
          >
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ maxWidth: 400, width: '100%' }}>
              <Grid pb={3} display="flex" direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                  <Typography sx={{ color: 'white' }} variant="h3" gutterBottom>
                    Welcome Back to
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ color: 'white' }} variant="h3" gutterBottom>
                    Brhma !
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3, backgroundColor: '#4c6fbf', }}>

            <Grid container direction="column" alignItems="center" sx={{ maxWidth: 400, width: '100%' }}>
              <Grid item sx={{ width: '100%' }}>
                <Typography sx={{ color: 'white', fontSize: 20 }}>User Name</Typography>
                <TextField fullWidth margin="normal" sx={{
                  bgcolor: 'white', borderRadius: 2,
                  '& .MuiInputBase-input': {
                    fontSize: '18px',
                    padding: '10px',
                  },
                }}
                  onChange={(e) => setUser_name(e.target.value)}
                />
                <Typography sx={{ color: 'white', fontSize: 20 }}>Password</Typography>
                <TextField fullWidth type="password" margin="normal" sx={{
                  bgcolor: 'white', borderRadius: 2, '& .MuiInputBase-input': {
                    fontSize: '18px',
                    padding: '10px',
                  }
                }}
                  onChange={(e) => setUser_pwd(e.target.value)}
                  onKeyDown={(e) => apiCallOnEnter(e)}
                />

                <Box sx={{ margin: '10px 0', pt: 3 }}>
                  <Button
                    variant="contained"
                    color="info"
                    disableElevation
                    fullWidth
                    disabled={user_name === "" || user_pwd === ""}
                    sx={{ backgroundColor: '#7b96d4', p: 1, fontSize: '15px', }}
                    onClick={() => apiCallonButton()}
                  >
                    LOGIN
                  </Button>
                </Box>
                <Box style={{ margin: "10px", color: "red" }} visibility={errorMsg === "" ? "hidden" : "visible"}>
                  {errorMsg}
                </Box>
              </Grid>
            </Grid>

          </Box>
        </Grid>

      </Grid>

    </Grid >


  )

};
export default MOSLogin;