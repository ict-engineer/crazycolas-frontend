import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import RawImage from "components/RawImage";
import KKIcon from "assets/img/KKIcon.png";
import KKlogo from "assets/img/KKlogo.png";
import DiscordIcon from "../components/Icons/DiscordIcon";
import TwitterIcon from "../components/Icons/TwitterIcon";

const useStyles = makeStyles((theme) => ({
  socialIcon: {},
}));

export default function Header() {
  const classes = useStyles();
  return (
      <Box className="w-full p-1" style={{background: "#93A1A5"}}>
        <Grid container spacing={2} className="h-full">
          <Grid item xs={4} md={4} className="flex items-center">
            <RawImage src={KKIcon} alt="Icon" className="w-20 h-14 pl-2"/>
          </Grid>
          <Grid item xs={4} md={4} className="flex items-center">
            <RawImage
                src={KKlogo}
                alt="Logo"
                className="w-48 h-20 mx-auto py-3"
            />
          </Grid>
          <Grid item xs={4} md={4} className="flex justify-end items-center">
            <DiscordIcon className={classes.socialIcon}/>
            <TwitterIcon className={classes.socialIcon}/>
          </Grid>
        </Grid>
      </Box>
  );
}
