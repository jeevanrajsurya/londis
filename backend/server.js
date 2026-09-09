require('dotenv').config();
const app = require('./src/app');
const initDefaultSettings = require('./src/config/initSettings');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`S&B Retail API running on http://localhost:${PORT}`);
  initDefaultSettings();
});
