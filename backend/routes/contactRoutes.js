import { Router } from 'express';
import { getContacts, addContact, deleteContact } from '../controllers/contactController';
import {auth} from '../middlewares/auth';

const router = Router();

router.get('/', getContacts);
router.post('/', auth, addContact); // Authentication required for adding contact
router.delete('/:id', auth, deleteContact); // Authentication required for deleting contact

export default router;