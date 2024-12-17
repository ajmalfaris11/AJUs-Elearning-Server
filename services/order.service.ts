import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";

// Controller to create a new order
export const newOrder = CatchAsyncError(async (data:any, res: Response, next: NextFunction) => {

    // Create a new order document in the database
    const order = await OrderModel.create(data); 

    res.status(200).json({
        success:true,
        order,
    })
});