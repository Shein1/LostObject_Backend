import { PORT } from "@env";
import "./middleware/passport";
import app from "./app";

const log = console.log;

app.listen(PORT, err => {
  if (err) throw err;
  log(`Server is running on port ${PORT}`);
});
