const getUserByEmailQuery =
  "SELECT * FROM `users` WHERE `email` = ? AND `deleted_at` IS NULL";
const setUserByEmailQuery = `INSERT INTO users (email, password, status) VALUES (?, ?, ?)`;

//services
const searchServiceQuery =
  "SELECT * FROM `services` WHERE `service_name` = ? AND `status` = 1 ";
const createServiceQuery =
  "INSERT INTO services ( `service_name`,  `service_desc`, `status`,`created_at`) VALUES (?,?,?,CURRENT_TIMESTAMP)";
const getAllServicesQuery = `SELECT * FROM services WHERE deleted_at IS NULL`;
const updateServiceQuery =
  "UPDATE `services` SET `service_name`=?,`service_desc`=?,`updated_at`= CURRENT_TIMESTAMP WHERE id = ? AND status = ? ";
const updateServiceStatusQuery = ` UPDATE services SET status = ? WHERE id = ?`;
const searchServiceByIdQuery =
  "SELECT * FROM `services` WHERE `id` = ? AND `status` = 1 ";

//reason
const createReasonQuery = `INSERT INTO reasons ( reason_name, status, created_at) VALUES ( ? , ?, CURRENT_TIMESTAMP )`;
const searchReasonQuery = `SELECT * FROM reasons WHERE reason_name = ? AND status = 1 `;
const getAllReasonQuery = `SELECT * FROM reasons WHERE  status = 1 AND deleted_at IS NULL `;
const updateReasonQuery =
  "UPDATE `reasons` SET `reason_name`=?,`updated_at`= CURRENT_TIMESTAMP WHERE id = ? AND status = ?  ";
const deleteReasonQuery = ` UPDATE reasons SET status = ? WHERE id = ?`;

// client
const searchClientByEmailPhoneQuery = `SELECT * FROM clients WHERE email = ? AND phoneNo = ?  AND status = 1  `;
const createClientQuery = `INSERT INTO clients ( name, phoneNo ,email ,address ,status, created_at) VALUES ( ?,?,?,?,?, CURRENT_TIMESTAMP )`;
const getAllCustomerQuery = `SELECT * FROM clients WHERE status = ?  AND deteted_at IS NULL`;
const updateClientQuery =
  "UPDATE `clients` SET `name`=?,`email`=?,`phoneNo`=?,`address`=?,`updated_at`= CURRENT_TIMESTAMP WHERE status = ? AND id = ? ";
const deleteClientQuery = ` UPDATE clients SET status = ? WHERE id = ?`;

//dashbboard

const getClientAddTodayQuery = `SELECT COUNT(*) AS add_today_clients FROM clients WHERE DATE(created_at) = CURDATE() AND status= ? `;
const getClientAddMonthlyQuery = `SELECT COUNT(*) AS add_month_clients 
FROM clients 
WHERE YEAR(created_at) = YEAR(CURDATE()) 
AND MONTH(created_at) = MONTH(CURDATE()) AND status= ? ;`;

const getClientAddTodayDetailsQuery = `SELECT * 
FROM clients 
WHERE DATE(created_at) = CURDATE() AND status = ?`;


const getClientPerDateQuery = `SELECT DATE(created_at) AS addClientDate, COUNT(*) AS clientCount 
FROM clients 
WHERE YEAR(created_at) = YEAR(CURRENT_DATE()) AND MONTH(created_at) = MONTH(CURRENT_DATE())
AND  status = ?
GROUP BY DATE(created_at)`;

const getClientPerMonthQuery = `SELECT MONTH(created_at) AS addClientmonth, COUNT(*) AS clientCountMonth 
FROM clients 
WHERE YEAR(created_at) = YEAR(CURRENT_DATE()) 
AND status = ? 
GROUP BY MONTH(created_at)
ORDER BY addClientmonth`;
                              

module.exports = {
  getUserByEmailQuery,
  setUserByEmailQuery,
  searchServiceQuery,
  createServiceQuery,
  getAllServicesQuery,
  updateServiceQuery,
  updateServiceStatusQuery,
  searchServiceByIdQuery,
  createReasonQuery,
  searchReasonQuery,
  getAllReasonQuery,
  updateReasonQuery,
  deleteReasonQuery,
  searchClientByEmailPhoneQuery,
  createClientQuery,
  getAllCustomerQuery,
  updateClientQuery,
  deleteClientQuery,
  getClientAddTodayQuery,
  getClientAddMonthlyQuery,
  getClientAddTodayDetailsQuery,
  getClientPerDateQuery,
  getClientPerMonthQuery
};
