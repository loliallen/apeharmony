import { Theme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles<Theme>(t => ({
  header: {
    "& > h2": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  card_media: {
    height: 350,
    border: "none",
    backgroundSize: "contain",
    [t.breakpoints.down('sm')]: {
      height: 300,
    }

  },
  main_card_media: {
    height: 400,
    border: "none",
    backgroundSize: "contain",
    [t.breakpoints.down('sm')]: {
      height: 300,
    }

  },
  card: {
    width: 300,
    // backgroundColor: "hsla(0, 0%, 12%, 1)",
    backgroundColor: "transparent",
    border: "none",
    // boxShadow: "3px 7px 8px 0px hsla(0, 0%, 12%, 1)"
    [t.breakpoints.down('sm')]: {
      width: 225,
    }
  },
  main_card: {
    width: 400,
    // backgroundColor: "hsla(0, 0%, 12%, 1)",
    backgroundColor: "transparent",
    border: "none",
    // boxShadow: "3px 7px 8px 0px hsla(0, 0%, 12%, 1)"
    [t.breakpoints.down('sm')]: {
      width: 250,
    }
  }
}),
{ name: "BodyStyles" }
);