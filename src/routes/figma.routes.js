
const figmaControllers = require("../controllers/figma.controllers");
const { exit } = require("process");

const getRequest = (app) => {
  app.get("/users", async (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password;
    let ret = await figmaControllers.getTeamMembers(username, password);
    res.send(ret);
    exit();
  });
};

const postRequest = (app) => {
  app.post("/users/", async (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password;
    let email = req.body.email;
    let ret = await figmaControllers.inviteMember(username, password, email);
    res.send(ret);
    exit();
  });
}

const deleteRequest = (app) => {
  app.delete("/users", async (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password;
    let email = req.body.email;
    let ret = await figmaControllers.deleteMember(username, password, email);
    res.send(ret);
    exit();
  });
}

module.exports = {getRequest, postRequest, deleteRequest};
