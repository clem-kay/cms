var express = require('express');
var router = express.Router();


const {FindAllAssemblies,CreateAssembly,UpdateAssembly,FindOneAssembly,DeleteAssembly} = require("../controllers/configurations/assembly");
const { FindAllOfficers, FindOneOffice, CreateOfficer, UpdateOfficer, DeleteOffice } = require('../controllers/configurations/officers');
const { FindAllMinistries, FindOneMinistry, CreateMinistry, UpdateMinistry, DeleteMinistry} = require("../controllers/configurations/ministries");
const { FindAllCommittees, FindOneCommittee, CreateCommittee, UpdateCommittee, DeleteCommittee} = require("../controllers/configurations/commitees");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//assembly routes
router.get("/getAssembly", FindAllAssemblies);
router.get("/getSingleAssembly/:id", FindOneAssembly);
router.post("/assembly",CreateAssembly);
router.put("/assembly/:id",UpdateAssembly);
router.delete("/assembly/:id",DeleteAssembly)

//officer routes
router.get("/getoffice", FindAllOfficers);
router.get("/getSingleoffice/:id", FindOneOffice);
router.post("/office",CreateOfficer);
router.put("/office/:id",UpdateOfficer);
router.delete("/office/:id",DeleteOffice)

//ministry routesrs
router.get("/getministry", FindAllMinistries);
router.get("/getSingleministry/:id", FindOneMinistry);
router.post("/ministry",CreateMinistry);
router.put("/ministry/:id",UpdateMinistry);
router.delete("/ministry/:id",DeleteMinistry)

//commitee routes
router.get("/getcommittee", FindAllCommittees);
router.get("/getSinglecommitee/:id", FindOneCommittee);
router.post("/committee",CreateCommittee);
router.put("/committee/:id",UpdateCommittee);
router.delete("/committee/:id",DeleteCommittee)

module.exports = router;
