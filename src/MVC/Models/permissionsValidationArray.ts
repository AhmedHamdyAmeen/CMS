import { check, body, param, query } from "express-validator";


module.exports = [ // Validations
  check('_id', '_id is required'),
  check('tradeName', 'tradeName must be Characters').isAlpha(),
  check('scientificName', 'scientificName must be Characters').isAlpha(),
  check('type', 'type is required').isAlpha(),
  check('cost', 'cost must be a Number').isNumeric()
];
