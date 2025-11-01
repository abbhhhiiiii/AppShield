import { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBlocked: 0,
    recentAttacks: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/logs");
        setStats({
          totalBlocked: response.data.length,
          recentAttacks: response.data.slice(-5),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Blocked Requests</Typography>
            <Typography variant="h3">{stats.totalBlocked}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Recent Attacks</Typography>
            {stats.recentAttacks.map((attack, index) => (
              <Box key={index} sx={{ mt: 1 }}>
                <Typography variant="body2">
                  {new Date(attack.timestamp).toLocaleString()} - {attack.type}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
