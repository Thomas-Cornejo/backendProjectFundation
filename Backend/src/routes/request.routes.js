import { Router } from 'express';
import {
    createRequest,
    getRequests,
    updateRequestStatus
} from '../controllers/requests.controller.js';

const router = Router();

router.get('/requests', getRequests);

router.post('/requests', createRequest);

router.put('/requests/:id_request', updateRequestStatus);

export default router;