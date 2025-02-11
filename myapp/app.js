const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours(); // 0 to 23

  const isWorkingDay = day >= 1 && day <= 5; // Monday to Friday
  const isWorkingHour = hour >= 9 && hour <= 17; // 9am to 5pm

  if (isWorkingDay && isWorkingHour) {
    next();
  }
   else {
    res.sendFile(__dirname + '/public/error.html');
  }
}

// Serve everything on the public folder as static files {css, js, images}
app.use(express.static(path.join(__dirname, 'public')));

// Apply middleware to all routes
app.use(checkWorkingHours); //this will be applied to all routes because it is before the routes

// Routes to HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, '/public/services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '/public/contact.html')));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
