const {
  searchServiceQuery,
  createServiceQuery,
  getAllServicesQuery,
  updateServiceQuery,
  searchServiceByIdQuery,
  updateServiceStatusQuery, 
} = require("./dbQueries");

const db = require("../../database/connection").promise();

const addServiceIndb = async (inputData) => {
  try {
    if (inputData.service_name) {
      const serviceName = inputData.service_name;
      let response = await searchServiceTable(serviceName);
      if (response.length >= 1) {
        return {
          status: 400,
          data: "Product already exist",
        };
      }
    }

    const [result] = await db.execute(createServiceQuery, [
      inputData.service_name,
      inputData.service_desc,
      inputData.status ?? 1,
    ]);
    if (result.affectedRows === 1) {
      return {
        status: 200,
        data: result,
      };
    } else {
      return {
        status: 400,
        data: "Data Insertion Failed",
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const searchServiceTable = async (serviceName) => {
  try {
    let [result] = await db.execute(searchServiceQuery, [serviceName]);

    const dataLength = result?.length;

    if (dataLength == 0) {
      return {
        status: 200,
        length: dataLength,
        data: null,
        message: "Service not found",
      };
    } else {
      return {
        status: 200,
        length: dataLength,
        data: result,
        message: "Service found successfully",
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllServices = async () => {
  try {
    const [result] = await db.execute(getAllServicesQuery);
    if (result.length === 0) {
      return {
        status: 400,
        data: "No data found",
      };
    } else {
      return {
        status: 200,
        data: result,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateServicesIndb = async (serviceData) => {
  try {
    const status = 1
    const serviceName = serviceData?.service_name || null

    if (serviceName) {
      let response = await searchServiceTable(serviceName);
      if (response.length >= 1 && response.data[0].id) {
        return {
          status: 400,
          data: "Service already exist",
        };
      }
    }

    const [result] = await db.execute(updateServiceQuery, [
      serviceName,
      serviceData?.service_desc,
      serviceData?.id,
      status
    ]);

    if (result.affectedRows === 1) {
      return {
        status: 200,
        data: result,
      };
    } else {
      return {
        status: 400,
        data: "Some error occured during querying the database",
      };
    }

    // console.log(existingService, "existingService");
    // const [result] = await db.execute(getAllServicesQuery);

    // if (result.length === 0) {
    //   return {
    //     status: 400,
    //     data: "No data found",
    //   };
    // } else {
    //   return {
    //     status: 200,
    //     data: result,
    //   };
    // }
  } catch (error) {
    throw new Error(error.message);
  }
};

//deleted services 


const deleteServicesIndb = async (id) => {
  try {
    // First, search for the service by id
    const service = await searchServiceById(id);

    // If service not found, return an error message
    if (!service || service.length === 0) {
      return {
        status: 404,
        data: "Service not found",
      };
    }


    // If service is found, check its status
    const currentStatus = service.data[0].status;
    // If the service is already inactive (status 0), no need to change
    if (currentStatus === 0) {
      return {
        status: 400,
        data: "Service is already inactive",
      };
    }

    // Update service status to 0 (inactive)
    const [result] = await db.execute(updateServiceStatusQuery, [0, id]);
    
    // If the status is updated successfully
    if (result.affectedRows === 1) {
      return {
        status: 200,
        data: "Service marked as inactive successfully.",
      };
    } else {
      return {
        status: 400,
        data: "Error occurred while updating the service status.",
      };
    }
  } catch (error) {
    console.error("Error in deleteServicesIndb:", error);
    throw new Error(error.message);
  }
};


const searchServiceById = async (id) => {
  try {
    let [result] = await db.execute(searchServiceByIdQuery, [id]);

    const dataLength = result?.length;

    if (dataLength == 0) {
      return {
        status: 200,
        length: dataLength,
        data: null,
        message: "Service not found",
      };
    } else {
      return {
        status: 200,
        length: dataLength,
        data: result,
        message: "Service found successfully",
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
 
};

 



//   const getAllProduct = async (page) => {
//     try {
//       let dataPerPage;
//       let offset;

//       if (page) {
//         dataPerPage = process.env.product_data_per_page;
//         offset = (page - 1) * dataPerPage;
//       } else {
//         dataPerPage = 18446744073709551615;
//         offset = 0;
//       }

//       const [countResult] = await db.execute(totalCountOfProduct);
//       const totalRows = countResult[0].totalRows;

//       const totalPages = Math.ceil(totalRows / dataPerPage);

//       const [result] = await db.execute(getAllProductQuery, [
//         dataPerPage,
//         offset,
//       ]);

//       if (result.length === 0) {
//         return {
//           status: 409,
//           data: "No data found",
//         };
//       } else {
//         if (page) {
//           return {
//             status: 200,
//             data: {
//               productList: result,
//               totalPages: totalPages,
//               dataPerPage: dataPerPage,
//               totalRows: totalRows,
//             },
//           };
//         } else {
//           return {
//             status: 200,
//             data: result,
//           };
//         }
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const deleteProductFromDb = async (productId) => {
//     try {
//       const [result] = await db.execute(deleteProductQuery, [productId]);

//       if (result.affectedRows === 1) {
//         return {
//           status: 200,
//           data: result,
//         };
//       } else {
//         return {
//           status: 400,
//           data: "Some error occured during querying the database",
//         };
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const getFilterProductList = async (categoryId, subCategoryId) => {
//     try {
//       const [result] = await db.execute(getFilterProductQuery, [
//         categoryId,
//         subCategoryId,
//       ]);

//       if (result.length === 0) {
//         return {
//           status: 409,
//           data: "No data found",
//         };
//       } else {
//         return {
//           status: 200,
//           data: result,
//         };
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const addProductRelation = async (productArray, leadId) => {
//     try {
//       // Initialize an array to store the results of each insert operation
//       const insertResults = [];

//       // Loop through the productArray
//       for (const productId of productArray) {
//         const [result] = await db.execute(addProductRelationQuery, [
//           leadId,
//           productId,
//         ]);

//         insertResults.push(result);
//       }

//       // Check the results of all insert operations
//       const successfulInserts = insertResults.filter(
//         (result) => result.affectedRows === 1
//       );

//       if (successfulInserts.length === productArray.length) {
//         // All inserts were successful
//         return { status: 200, data: "Product added successfully" };
//       } else {
//         // Some inserts failed
//         return {
//           status: 400,
//           data: "Some error occurred during querying the database",
//         };
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const updateProductIdsForLead = async (leadId, currentProductIds) => {
//     try {
//       // Retrieve previous product IDs for the lead ID
//       const [results, fields] = await db.execute(selectLeadQuery, [leadId]);
//       const previousProductIds = results.map((row) => row.productId);

//       // Identify removed product IDs
//       const removedProductIds = previousProductIds.filter(
//         (productId) => !currentProductIds.includes(productId)
//       );

//       // Handle removed product IDs
//       for (const productId of removedProductIds) {
//         await db.execute(updateLeadProductQuery, [leadId, productId]);
//       }

//       // Identify new product IDs
//       const newProductIds = currentProductIds.filter(
//         (productId) => !previousProductIds.includes(productId)
//       );

//       // Insert new product IDs
//       for (const productId of newProductIds) {
//         await db.execute(replaceLeadProductQuery, [leadId, productId]);
//       }

//       return { status: 200, data: "Product updates applied successfully" };
//     } catch (error) {
//       console.error("Error:", error);
//       return { status: 400, data: error };
//     }
//   };

//   const getProductFromDb = async (productId) => {
//     try {
//       const [result] = await db.execute(getProductByIdQuery, [productId]);

//       if (result.length === 0) {
//         return {
//           status: 400,
//           data: "No data found",
//         };
//       } else {
//         return {
//           status: 200,
//           data: result,
//         };
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const getProductDetailsFromName = async (productName) => {
//     try {
//       const [result] = await db.execute(getProductByNameQuery, [productName]);

//       if (result.length === 0) {
//         return {
//           status: 400,
//           data: "No data found",
//         };
//       } else {
//         return {
//           status: 200,
//           data: result,
//         };
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };







 


 






module.exports = {
  addServiceIndb,
  getAllServices,
  updateServicesIndb,
  deleteServicesIndb
};
