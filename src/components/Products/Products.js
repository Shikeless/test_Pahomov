import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Hidden,
  Grid,
  Button
} from "@material-ui/core";
import { AddCircle, Cancel } from "@material-ui/icons";
import { productsRequest } from "../../modules/Products/actions";
import { logout } from "../../modules/Auth/actions";
import { getIsLoading } from "../../modules/App/app";
import { getProducts } from "../../modules/Products";
import Loading from "../Loading";

const MapStateToProps = state => ({
  products: getProducts(state),
  isLoading: getIsLoading(state)
});

const MapDispatchToProps = { productsRequest, logout };

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#F3F3F3",
    border: "1px solid #E6E6E6",
    color: "#4F525A"
  },
  body: {
    border: "1px solid #E6E6E6",
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    width: "90%"
  },
  smallLogo: {
    width: "40px"
  },
  mediumLogo: {
    width: "80px"
  },
  imgColumn: {
    width: "40px"
  },
  addRemoveColumn: {
    width: "50px"
  },
  titleBox: {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    marginTop: "34px",
    borderBottom: "1px solid #E6E6E6"
  },
  title: { color: "#C6213C" },
  table: {
    marginTop: "40px"
  },
  addCircle: {
    color: "#2196F3"
  },
  cancel: {
    color: "#C6213C"
  },
  logout: {
    position: "absolute",
    top: "20px",
    right: 0
  }
}));

const titles = {
  name: "Наименование",
  count: "Кол-во",
  price: "ена за ед, ₽",
  sum: "Стоимость, ₽"
};

function Products(props) {
  useEffect(() => {
    props.productsRequest();
  }, []);

  const logoutButton = () => {
    window.localStorage.removeItem("jwt");
    props.logout();
  };

  const classes = useStyles();

  if (props.isLoading) {
    return <Loading />;
  }
  return (
    <div className={classes.root}>
      <Button
        onClick={() => {
          logoutButton();
        }}
        className={classes.logout}
        variant="contained"
      >
        Default
      </Button>
      <Box className={classes.titleBox}>
        <Typography variant="h6" component="h6" className={classes.title}>
          Результаты расчёта
        </Typography>
      </Box>
      <Hidden smDown>
        <Table
          className={classes.table}
          size="small"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>{titles.name}</StyledTableCell>
              <StyledTableCell align="center">{titles.count}</StyledTableCell>
              <StyledTableCell align="center">{titles.price}</StyledTableCell>
              <StyledTableCell align="center">{titles.sum}</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.products &&
              props.products.map((item, index) => (
                <TableRow key={index}>
                  <StyledTableCell className={classes.imgColumn}>
                    <img
                      src={require(`../../icons/${item.img}`)}
                      alt=""
                      className={classes.smallLogo}
                    ></img>
                  </StyledTableCell>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.count}</StyledTableCell>
                  <StyledTableCell align="center">{item.price}</StyledTableCell>
                  <StyledTableCell align="center">{item.sum}</StyledTableCell>
                  <StyledTableCell className={classes.addRemoveColumn}>
                    <AddCircle className={classes.addCircle} />
                    <Cancel className={classes.cancel} />
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Hidden>
      <Hidden mdUp>
        <Grid container spacing={4}>
          {props.products &&
            props.products.map((item, index) => (
              <Grid key={index} item xs={12} sm={12}>
                <Box>
                  <Table
                    key={index}
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableBody>
                      <TableRow>
                        <StyledTableCell align="center" colSpan={2}>
                          <img
                            src={require(`../../icons/${item.img}`)}
                            className={classes.mediumLogo}
                            alt=""
                          ></img>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell style={{ backgroundColor: "#F3F3F3" }}>
                          {titles.name}
                        </StyledTableCell>
                        <StyledTableCell>{item.name}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell style={{ backgroundColor: "#F3F3F3" }}>
                          {titles.count}
                        </StyledTableCell>
                        <StyledTableCell>{item.count}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell style={{ backgroundColor: "#F3F3F3" }}>
                          {titles.price}
                        </StyledTableCell>
                        <StyledTableCell>{item.price}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell style={{ backgroundColor: "#F3F3F3" }}>
                          {titles.sum}
                        </StyledTableCell>
                        <StyledTableCell>{item.sum}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell align="center">
                          <AddCircle className={classes.addCircle} />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Cancel className={classes.cancel} />
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Hidden>
    </div>
  );
}

export default connect(MapStateToProps, MapDispatchToProps)(Products);
