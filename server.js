const app = require('./dist/app').default
const db = require('./dist/models').default

async function startServer() {
  await db.sync();
  await app.listen(process.env.PORT || 3000);

  console.log("starting server on http://localhost:3000");
}

startServer()
