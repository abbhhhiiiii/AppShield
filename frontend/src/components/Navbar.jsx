import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <SecurityIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AppShield WAF
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/logs">
          Logs
        </Button>
        <Button color="inherit" component={Link} to="/rules">
          Rules
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
