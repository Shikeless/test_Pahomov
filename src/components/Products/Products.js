import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox } from "final-form-material-ui";
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
  Paper
} from "@material-ui/core";
import { AddCircle, Cancel } from "@material-ui/icons";
import validator from "validator";
import { productsRequest } from "../../modules/Products/actions";
import { getIsLoading } from "../../modules/App/app";
import { getProducts } from "../../modules/Products";
import Loading from "../Loading";
import im from "../../icons/Ellipse.png";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const titles = {
  name: "Наименование",
  count: "Кол-во",
  price: "ена за ед, ₽",
  sum: "Стоимость, ₽"
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const MapStateToProps = state => ({
  products: getProducts(state),
  isLoading: getIsLoading(state)
});

const MapDispatchToProps = { productsRequest };

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
  }
}));

function Products(props) {
  useEffect(() => {
    props.productsRequest();
  }, []);

  const classes = useStyles();

  if (props.isLoading) {
    return <Loading />;
  }
  return (
    <div className={classes.root}>
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
              <Grid item xs={12} sm={12}>
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
