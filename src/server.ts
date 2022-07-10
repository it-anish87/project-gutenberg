import app from "./app";
import { appDataSource } from "./db/dataSource";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  appDataSource
    .initialize()
    .then(async () => {
      console.log("Database connection established.");
    })
    .catch((error) => console.log(error));
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
