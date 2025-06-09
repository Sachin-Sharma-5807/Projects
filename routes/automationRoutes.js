import express from 'express';
import {createAutomation,getAndFilter,getAutomationById,deleteAutomation,getDropdownOptions,addDropdownOption} from '../controllers/automationController.js'
const router=express.Router();

router.post("/createAutomation",createAutomation);
router.post('/getAndFilter', getAndFilter);
router.get('/:id', getAutomationById);
router.delete('/delete/:id', deleteAutomation);
router.post('/add', addDropdownOption);
router.post("/getDropdownOptions",getDropdownOptions);

export default router; 