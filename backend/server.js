import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('./app');
const config = require('./config');

app.listen(config.PORT, () => {
  console.log(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
});