const { login, signUp } = require("../controller/authController");
const { addClient, getAllClient, updateClient, deleteClient } = require("../controller/clientController");
const { getClientAddToday, getClientAddMonthly, getClientAddTodayDetails, getClientPerDay, getClientPerMonth } = require("../controller/dashboardController");
const { addReason, getReasonList, updateReason, deleteReason } = require("../controller/reasonController");
const {
  addService,
  getServiceList,
  updateServiceList,
  deleteService,
} = require("../controller/serviceController");

const router = require("express").Router();

// POST /login route
router.post("/login", login);
router.post("/reg", signUp);

// service apis

router.post("/service/add", addService);
router.get("/service/get", getServiceList);
router.put("/service/update", updateServiceList);
router.post("/service/delete", deleteService);

// reason api's 
router.post("/reason/add", addReason);
router.get("/reason/get", getReasonList);
router.put("/reason/update/:id", updateReason);
router.post("/reason/delete", deleteReason);

// ClientsData api's 
router.post("/client/add", addClient);
router.get("/client/get", getAllClient);
router.put("/client/update/:id", updateClient);
router.post("/client/delete/:id", deleteClient);


// Dashboard
router.get("/total_today_addClient", getClientAddToday);
router.get("/monthly_addClient", getClientAddMonthly);
router.get("/todayCllient_details", getClientAddTodayDetails);
router.get("/client-per-day",  getClientPerDay);
router.get("/client-per-month",  getClientPerMonth);






module.exports = router;
