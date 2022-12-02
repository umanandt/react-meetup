"use strict";
(() => {
var exports = {};
exports.id = 365;
exports.ids = [365];
exports.modules = {

/***/ 6088:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ new_meetupp)
});

;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
;// CONCATENATED MODULE: ./pages/api/new-meetupp.js
// post/api/new-meetup

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        //const { title, image, address, description } = data;
        const client = await external_mongodb_namespaceObject.MongoClient.connect("mongodb+srv://8869:Umanand321@cluster0.xrrz76s.mongodb.net/meetups?retryWrites=true&w=majority");
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({
            message: "Meetup Inserted!"
        });
    }
}
/* harmony default export */ const new_meetupp = (handler); // All code is for database connect and checking request and response
 // fetching data from mongoDB


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6088));
module.exports = __webpack_exports__;

})();