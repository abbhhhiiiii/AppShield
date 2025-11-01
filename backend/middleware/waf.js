const fs = require("fs");
const path = require("path");

class WAF {
  constructor() {
    this.rules = this.loadRules();
  }

  loadRules() {
    try {
      const rulesPath = path.join(__dirname, "..", "rules.json");
      const rulesContent = fs.readFileSync(rulesPath, "utf8");
      return JSON.parse(rulesContent).rules;
    } catch (error) {
      console.error("Error loading rules:", error);
      return {};
    }
  }

  reloadRules() {
    this.rules = this.loadRules();
    return this.rules;
  }

  logAttack(attack) {
    try {
      const logPath = path.join(__dirname, "..", "logs", "attacks.log");
      const logEntry = {
        ...attack,
        timestamp: new Date().toISOString(),
      };

      // Create logs directory if it doesn't exist
      const logsDir = path.join(__dirname, "..", "logs");
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      // Create file if it doesn't exist
      if (!fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, "", "utf8");
      }

      fs.appendFileSync(logPath, JSON.stringify(logEntry) + "\n", "utf8");
      console.log("Attack logged:", logEntry);
    } catch (error) {
      console.error("Error logging attack:", error);
    }
  }

  scanForAttacks(data, type) {
    for (const [ruleType, rule] of Object.entries(this.rules)) {
      for (const pattern of rule.patterns) {
        const regex = new RegExp(pattern, "i");
        if (regex.test(data)) {
          return {
            type: ruleType,
            pattern: pattern,
            match: data,
          };
        }
      }
    }
    return null;
  }

  middleware(req, res, next) {
    // Skip scanning for /logs endpoint
    if (req.url === "/logs") {
      return next();
    }

    // Data to scan
    const url = req.url;
    const body = JSON.stringify(req.body);
    const headers = JSON.stringify(req.headers);
    const params = JSON.stringify(req.params);
    const query = JSON.stringify(req.query);

    // Combine all data points to scan
    const dataToScan = [url, body, params, query];
    for (const data of dataToScan) {
      const attack = this.scanForAttacks(data);
      if (attack) {
        // Log the attack
        this.logAttack({
          ip: req.ip,
          url: req.url,
          method: req.method,
          ...attack,
        });

        // Block the request
        return res.status(403).json({
          error: "Request blocked by AppShield WAF",
          reason: `Potential ${attack.type} detected`,
        });
      }
    }

    // If no attacks detected, forward the request
    next();
  }
}

module.exports = new WAF();
