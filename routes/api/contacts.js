const express = require('express');


const router = express.Router();
const {getAll, addNewContact, updateById, deleteById} = require("../../controllers/contacts/index");
const {validateBody, isValidId, authenticate} = require("../../middlewares/index");
const  { schemas }  = require("../../models/contact");


router.post('/',authenticate, validateBody(schemas.addAdminPanelContactSchema), addNewContact.addNewContact);

router.get('/', authenticate, getAll.getAll);

router.delete("/:contactId",authenticate, isValidId, deleteById.deleteById);

router.patch('/:contactId',authenticate, isValidId, validateBody(schemas.updateSchema), updateById.updateById);


module.exports = router;

