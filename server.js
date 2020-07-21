import app from './dist/app'
import db from './dist/db'

async function startServer() {
  await db.sync();
  await app.listen(3000);

  console.log("starting server on http://localhost:3000");
}

startServer()