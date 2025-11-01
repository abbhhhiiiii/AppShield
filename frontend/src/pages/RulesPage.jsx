import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function RulesPage() {
  const [rules, setRules] = useState({});
  const [editRule, setEditRule] = useState(null);
  const [editPattern, setEditPattern] = useState("");

  const fetchRules = async () => {
    try {
      const response = await fetch("http://localhost:3000/rules.json");
      const data = await response.json();
      setRules(data.rules);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleEdit = (type, pattern) => {
    setEditRule({ type, pattern });
    setEditPattern(pattern);
  };

  const handleSave = async () => {
    // In a real application, you would update the rules.json file
    // through a backend API endpoint
    setEditRule(null);
    // Reload rules
    const response = await axios.post("http://localhost:3000/rules/reload");
    if (response.data.rules) {
      setRules(response.data.rules);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        WAF Rules
      </Typography>
      {Object.entries(rules).map(([type, rule]) => (
        <Paper key={type} sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {type}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {rule.description}
          </Typography>
          <List>
            {rule.patterns.map((pattern, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleEdit(type, pattern)}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={pattern} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}

      <Dialog open={!!editRule} onClose={() => setEditRule(null)}>
        <DialogTitle>Edit Pattern</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Pattern"
            fullWidth
            value={editPattern}
            onChange={(e) => setEditPattern(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditRule(null)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RulesPage;
