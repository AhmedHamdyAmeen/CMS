"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route("/login/:userType")
    .post(login, resultValidator, authController.login);
router.route("/signUp").post(post, resultValidator, authController.signUp);
router
    .route("/forgotPassword")
    .post(forgotPassword, resultValidator, authController.forgotPassword);
router
    .route("/resetPassword/:token")
    .post(resetPassword, resultValidator, authController.resetPassword);
router.use(auth);
router
    .route("/:id/changePassword")
    .post(idValidator, resultValidator, doctorAuth, authController.changePassword);
exports.default = router;
