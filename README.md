# AppShield: Rule-Based Web Application Firewall (WAF)

## 📝 Project Overview

AppShield is a robust Web Application Firewall (WAF) built using the MERN stack that protects web applications from common security threats. It acts as a reverse proxy, inspecting incoming HTTP requests and blocking malicious attacks while allowing legitimate traffic.

## 🛡️ Key Features

- Real-time attack detection and blocking
- Protection against:
  - SQL Injection attacks
  - Cross-Site Scripting (XSS)
  - Path Traversal attempts
  - Command Injection
- Interactive dashboard for monitoring
- Real-time attack logging
- Customizable security rules
- Export attack logs as CSV
- Easy integration with any web application

## 🏗️ Project Structure

```
AppShield/
├── backend/                 # WAF and API Server
│   ├── app.js             # Main server file
│   ├── middleware/
│   │   └── waf.js        # WAF logic implementation
│   ├── rules.json        # Security rules configuration
│   └── logs/
│       └── attacks.log   # Attack logs storage
│
├── frontend/               # React Dashboard
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/       # Dashboard pages
│   │   └── App.jsx      # Main React component
│   └── vite.config.js    # Vite configuration
│
└── target-app/            # Test application
    └── app.js            # Simple Express app for testing
```

## Setup Instructions

1. Install dependencies for all components:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Target App
cd ../target-app
npm install
```

2. Start the services:

```bash
# Start target app (Terminal 1)
cd target-app
npm run dev

# Start WAF backend (Terminal 2)
cd backend
npm run dev

# Start frontend (Terminal 3)
cd frontend
npm run dev
```

The services will be available at:

- Frontend Dashboard: http://localhost:5173
- WAF Backend: http://localhost:3000
- Target App: http://localhost:4000

## 🧪 Testing Guide

1. **Normal Request (Should Work)**

   ```
   http://localhost:3000/search?q=hello+world
   ```

2. **XSS Attack Test (Should be Blocked)**

   ```
   http://localhost:3000/search?q=<script>alert(1)</script>
   ```

3. **SQL Injection Test (Should be Blocked)**

   ```
   http://localhost:3000/search?q=UNION SELECT * FROM users
   ```

4. **Path Traversal Test (Should be Blocked)**

   ```
   http://localhost:3000/search?q=../../etc/passwd
   ```

5. **Command Injection Test (Should be Blocked)**
   ```
   http://localhost:3000/search?q=; cat /etc/passwd
   ```

## 🚀 Deployment Guide

1. **Backend Deployment:**

   - Set up a Node.js environment (e.g., AWS EC2, Heroku)
   - Configure environment variables:
     ```
     PORT=3000
     TARGET_URL=http://your-app-url
     ```
   - Use PM2 or similar for process management
   - Set up NGINX as a reverse proxy (optional)

2. **Frontend Deployment:**

   - Build the React app: `npm run build`
   - Deploy to static hosting (Netlify, Vercel, or S3)
   - Update API endpoints to match your backend URL

3. **Security Considerations:**
   - Use HTTPS certificates
   - Implement API authentication
   - Regular security rule updates
   - Backup log management

## 🔄 Real-Time Usage

1. **Production Integration:**

   ```
   Internet -> CloudFlare -> AppShield WAF -> Your Web Application
   ```

2. **Monitoring:**
   - Real-time attack notifications
   - Daily/Weekly security reports
   - Traffic analysis
   - Attack pattern recognition

## 🚀 Future Enhancements

1. **Security Features:**

   - Machine Learning for attack pattern detection
   - Rate limiting and DDoS protection
   - IP reputation database integration
   - Custom rule creation UI
   - Behavioral analysis

2. **Dashboard Features:**

   - Advanced analytics and reporting
   - Email notifications
   - Team collaboration features
   - Custom dashboard widgets
   - Mobile app for monitoring

3. **Integration Features:**
   - Cloud platform integrations (AWS, Azure, GCP)
   - Container deployment support
   - API gateway integration
   - Load balancer support
   - Multiple target application support

## 📝 API Documentation

### WAF Endpoints

- GET `/status` - Check WAF status
- GET `/logs` - Retrieve attack logs
- POST `/rules/reload` - Reload security rules

### Target App Endpoints

- POST `/login` - Test login endpoint
- GET `/search` - Test search endpoint
- GET `/product/:id` - Test product endpoint

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This WAF is designed for educational purposes and basic security needs. For production environments, consider additional security measures and professional security auditing.

## API Endpoints

### WAF Backend

- GET /status - Check WAF status
- GET /logs - Get attack logs
- POST /rules/reload - Reload security rules

### Target App

- POST /login - Test login endpoint
- GET /search - Test search endpoint
- GET /product/:id - Test product endpoint

## Security Rules

Security rules are defined in `backend/rules.json` and include patterns for detecting:

- SQL Injection
- Cross-Site Scripting (XSS)
- Path Traversal
- Command Injection

## License

MIT
