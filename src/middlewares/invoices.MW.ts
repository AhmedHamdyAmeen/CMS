import { check, body, param, query } from "express-validator";

export const bodyValidator=[
    body("id").isMongoId().withMessage("id should be Mongoose"),
]  

export const postValidator=[
    body("doctors").isMongoId().withMessage("doctors should be Mongoose"),
    body("medicines").isArray().withMessage("medicines should be array of Mongoose"),
    body("patients").isMongoId().withMessage("patients should be Mongoose"),
    body("services").isArray().withMessage("services should be array of Mongoose"),
    body("paymentMethod").isIn(["cash", "credit card", "insurance card"]).withMessage(" paymentMethod should be 'cash, credit card, insurance car'"),
    body("totalCost").isNumeric().withMessage("Total cost should ba a number"),
    body('isPaid').isBoolean().withMessage("cost should be Boolen")
]


export const ParamValidator=[
    param("id").isMongoId().withMessage('param should be mongoId'),
   
]

export const putValidator=[
    body("name").optional().isAlpha().withMessage("invoice Name should be string"),
    body("doctors").optional().isMongoId().withMessage("doctors should be Mongoose"),
    body(" medicines").optional().isMongoId().withMessage(" medicines should be Mongoose"),
    body(" services").optional().isMongoId().withMessage(" services should be Mongoose"),
    body(" paymentMethod").optional().isIn(["cash", "credit card", "insurance card"]).withMessage(" paymentMethod should be 'cash, credit card, insurance car'"),
    body('isPaid').optional().isBoolean().withMessage("cost should be Boolen")
]