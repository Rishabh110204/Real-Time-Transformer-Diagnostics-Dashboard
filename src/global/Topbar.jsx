import React, { useContext, useEffect } from "react";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

const handleredirect = () => {
  window.open('https://docs.google.com/spreadsheets/d/1eTTOYMgIiHgZMSLgzKSmXpTTfPb4_a0MqoRsyorvXVk/edit?usp=sharing');
};

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor={colors.primary[400]}
      boxShadow={1}
      zIndex={1}
      position="sticky"
      top={0}
      width="100%"
    >
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>

      <Button
  component="label"
  variant="contained"
 
  startIcon={<DescriptionTwoToneIcon />}
  onClick={handleredirect}
  color="mode"
>
Open Sheet
</Button>
    
    </Box>
  );
};

export default Topbar;


