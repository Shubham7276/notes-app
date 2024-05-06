import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../app/features/notes/authSlice";

const Signup = () => {
  const errorMsg = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error , setError] = useState(errorMsg)
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async() => {
      try {
        const res = await dispatch(signupUser(data))
        if(!res?.error?.message){
          navigate("/login")
        }else{
          setError(res.error.message)
        }
      } catch (error) {
        console.log("Signup failed:", error)
      }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "50%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              variant="standard"
              value={data.username}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              variant="standard"
              type={"email"}
              value={data.email}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              variant="standard"
              type={"password"}
              value={data.password}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={onSubmit}>
              Signup
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </Typography>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <p style={{ color: "red" }}>{error}</p>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default Signup;
