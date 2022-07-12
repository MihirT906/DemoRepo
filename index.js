const express = require("express");
const FigmaRoutes = require("./src/routes/figma.routes")

const app = express();
const port = 3005;

app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
  console.log(`app is running on port: ${port}`);
});

FigmaRoutes.getRequest(app);
FigmaRoutes.postRequest(app);
FigmaRoutes.deleteRequest(app);

