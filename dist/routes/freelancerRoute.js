"use strict";
// import express,{ Request, Response, NextFunction, Router } from 'express';
// import { body, param } from "express-validator";
// import { freelancerController } from "../controllers/freelancerController";
// import resultValidator from "../middlewares/validationMW";
// export const freelancerRoute = Router();
// freelancerRoute.route("/freelancer")
//     .get(freelancerController.getAllFreelancers)
//     .post([
//         //name
//         body("firstName").isAlpha().withMessage("freelancer's firstname should be characters")
//         .isLength({min:3}).withMessage("freelancer firstname lenghth should be > 3"),
//         body("lastName").isAlpha().withMessage("freelancer's lastname should be characters")
//         .isLength({min:3}).withMessage("freelancer lastname lenghth should be > 3"),
//         body("email").isEmail().withMessage("freelancer's email invalid"),
//         body("password").isLength({min:4}).withMessage("freelancer's password should be > 4"),
//         body("secondEmail").optional({ checkFalsy: true, nullable: true })
//         .isEmail().withMessage("freelancer's second email invalid"),
//         body("phone").optional({ checkFalsy: true, nullable: true })
//         .isLength({min:11}).withMessage("children number must be > 2"),
//     ],
//     resultValidator,
//     freelancerController.addFreelancer)
//     .put([
//     ],
//     // validationMW,
//     freelancerController.updateFreelancer);
// freelancerRoute.route("/freelancers/:id")
//     .delete([
//         // param("id").isMongoId().withMessage("Freelancer id wrong")
//     ],
//     // validationMW.validate,
//     freelancerController.deleteFreelancer);
