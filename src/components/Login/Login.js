import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox } from "final-form-material-ui";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControlLabel
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { authRequest, verRequest } from "../../modules/Auth/actions";
import { getIsAuthorized } from "../../modules/Auth/auth";
import { load } from "../../localStorage";
import { validate } from "../../helpers/validate";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

const MapDispatchToProps = { authRequest, verRequest };

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      margin: "auto",
      width: "90%",
      height: "90%"
    },
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      margin: "auto",
      width: "380px",
      height: "541px"
    }
  },
  footer: {
    color: "rgba(0, 0, 0, 0.54)",
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  button: {
    background: "#2196F3",
    marginBottom: "10px",
    "&:hover": {
      background: "#2F80ED"
    }
  },
  formElement: {
    marginBottom: "21px"
  },
  iconCircle: {
    height: "40px",
    width: "40px",
    backgroundColor: "#E10050",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "72px",
    marginBottom: "10px"
  },
  icon: {
    color: "white"
  },
  alignLeft: {
    float: "left"
  },
  alignRight: {
    float: "right"
  },
  wrapper: {
    display: "block",
    wordWrap: "break-word"
  },
  ref: {
    color: "#2196F3",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

function Login(props) {
  useEffect(() => {
    if (load("jwt") !== null) props.verRequest();
  });

  const onSubmit = values => {
    props.authRequest(values);
  };

  const classes = useStyles();

  if (props.isAuthorized) return <Redirect to="/products" />;
  return (
    <Box className={classes.root}>
      <Box align="center">
        <Box className={classes.iconCircle}>
          <LockOutlined className={classes.icon} />
        </Box>
      </Box>
      <Typography
        variant="h5"
        align="center"
        component="h5"
        className={classes.formElement}
      >
        Вход в аккаунт
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: load("email"), password: load("password") }}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Field
              className={classes.formElement}
              name="email"
              fullWidth
              required
              component={TextField}
              variant="outlined"
              type="email"
              label="Почта"
            />
            <Field
              name="password"
              fullWidth
              required
              component={TextField}
              variant="outlined"
              type="password"
              label="Пароль"
            />
            <FormControlLabel
              className={classes.formElement}
              label="Запомнить меня"
              control={
                <Field
                  name="remember"
                  component={Checkbox}
                  type="checkbox"
                  color="primary"
                  value="remember"
                />
              }
            />
            <Button
              className={classes.button}
              variant="contained"
              fullWidth
              type="submit"
              disabled={submitting}
            >
              Войти в аккаунт
            </Button>
          </form>
        )}
      />
      <Grid container wrap="wrap" spacing={0}>
        <Grid className={classes.gr} item xs={5}>
          <Typography
            className={classes.ref}
            variant="caption"
            component="p"
            align="left"
          >
            Забыли пароль?
          </Typography>
        </Grid>
        <Grid className={classes.gr} item xs={7}>
          <Typography
            className={classes.ref}
            variant="caption"
            component="p"
            align="right"
          >
            Еще нет аккаунта? Регистрация
          </Typography>
        </Grid>
      </Grid>
      <Typography
        className={classes.footer}
        align="center"
        variant="caption"
        component="p"
      >
        Copyright© Ваш сайт 2019.
      </Typography>
    </Box>
  );
}

export default connect(MapStateToProps, MapDispatchToProps)(Login);
