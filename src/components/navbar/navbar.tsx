import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import Cancel from "@material-ui/icons/Cancel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { SiBitcoinsv } from "react-icons/si";
import { FcCurrencyExchange, FcDebt } from "react-icons/fc";
import { ListItemIcon } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#273746",
  },
  coin: {
    fontSize: 40,
    marginLeft: "auto",
    color: "#FFBF00",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {},
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  text: {
    fontFamily: "Times New Roman",
    fontSize: 25,
    marginLeft: "auto",
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));
const ResponsiveNavbar = () => {
  const dummyCategories = [
    {
      text: "",
      name: "INFORMATION ABOUT COINS",
      icon: <FcDebt />,
    },
    {
      text: "allChangues",
      name: "EXCHANGUES COINS",
      icon: <FcCurrencyExchange />,
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <List>
        {dummyCategories.map((item, index) => {
          const { text, name, icon } = item;
          return (
            <ListItem
              style={{
                color: "white",
                fontFamily: "Times New Roman",
                margin: "auto",
                fontSize: 12,
                borderRadius: 3,
                marginBottom: 30,
                marginTop: 30,
                backgroundColor: "#273746 ",
                width: 220,
                boxShadow: "0 4px 8px 1 rgba(0,0,0,0.2)",
              }}
              button
              key={text}
              component={Link}
              to={"/" + text}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon
                style={{
                  fontSize: 30,
                }}
              >
                {icon}
              </ListItemIcon>
              {name}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.text} variant="h6" noWrap>
            Site for buying and exchanging cryptocurrencies
          </Typography>
          <SiBitcoinsv className={classes.coin} />
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <Cancel className={classes.coin} />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}></div>
    </div>
  );
};
ResponsiveNavbar.propTypes = {
  container: PropTypes.object,
};
export default ResponsiveNavbar;
