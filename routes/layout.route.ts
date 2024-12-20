import express from 'express';
import { authorizedRoles, isAuthenticated } from '../middleware/auth';
import { createLayout, editLayout, getLayoutByType } from '../controllers/layout.controller';
const layoutRoute = express.Router();

layoutRoute.post("/create-layout", isAuthenticated, authorizedRoles("admin"), createLayout);

layoutRoute.put("/edit-layout", isAuthenticated, authorizedRoles("admin"), editLayout);

layoutRoute.get("/get-layout", getLayoutByType);


export default layoutRoute;