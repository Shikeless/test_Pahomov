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
import validator from "validator";
import { authRequest, verRequest } from "../../modules/Auth/actions";
import { getIsAuthorized } from "../../modules/Auth/auth";
import { load } from "../../localStorage";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

const MapDispatchToProps = { authRequest, verRequest };

const validate = values => {
  const errors = {};
  if (values.password) {
    if (/\s/.test(values.password)) {
      errors.password = "Поле не должно содержать пробелов";
    }
    if (!validator.isAlphanumeric(values.password)) {
      errors.password = "Поле должно содержать только цифры и латинские буквы";
    }
    if (values.password.length < 5) {
      errors.password = "Поле должно состоять минимум из 5 символов";
    }
    if (validator.isEmpty(values.password)) {
      errors.password = "Поле обязательное для заполнения";
    }
  } else {
    errors.password = "Поле обязательное для заполнения";
  }
  if (values.email) {
    if (validator.isEmpty(values.email)) {
      errors.email = "Поле обязательное для заполнения";
    }
    if (!validator.isEmail(values.email)) {
      errors.email = "Введите корректный email";
    }
  } else {
    errors.email = "Поле обязательное для заполнения";
  }
  return errors;
};

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
      height: "100%",
      border: "solid 1px black",
      display: "block",

      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      margin: "auto",
      width: "380px",
      height: "100%",
      border: "solid 1px black"
    }
  },
  button: {
    background: "#2196F3",
    marginBottom: "21px",
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
    justifyContent: "center"
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
  gr: {
    backgroundColor: "#E10050"
  }
}));

function Login(props) {
  useEffect(() => {
    console.log(props);
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
              label="Outlined"
              variant="outlined"
              type="email"
              label="Почта"
            />
            <Field
              name="password"
              fullWidth
              required
              component={TextField}
              label="Outlined"
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
              className={classes.formElement}
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
      <Grid container wrap="nowrap" spacing={0}>
        <Grid className={classes.gr} item xs={4}>
          <Typography align="left">12312</Typography>
        </Grid>
        <Grid className={classes.gr} item xs={8} zeroMinWidth>
          <Typography align="right">
            1233333333333333333333333333333333333333333333333335111111111111111111
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default connect(MapStateToProps, MapDispatchToProps)(Login);
