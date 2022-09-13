import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

import {
  createBatch,
  deleteBatch,
  findBatch,
  getBatches,
  updater,
  verifyDuplicate,
} from "../services/batchServices";
import { BatchTypes } from "../types/batchTypes";

export const getAllBathes = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const batches = await getBatches();

    if (!batches?.length) {
      return res.status(400).json({ message: "No batch found" });
    }
  }
);
export const createNewBatch = asyncHandler(async (req: Request, res: any) => {
  const { batch, arrived }: BatchTypes = req.body;

  if (!batch) {
    return res.status(400).json({ message: "Batch is required" });
  }
  const duplicate = await verifyDuplicate(batch);

  if (duplicate) {
    return res.status(409).json({ message: "Batch already exists" });
  }
  const batchObject = { batch, arrived };
  const newBatch = await createBatch(batchObject);

  if (newBatch) {
    res.status(201).json({ mesage: `New batch ${batch} created` });
  }
});

export const updateBatch = asyncHandler(async (req: Request, res: any) => {
  const {
    id,
    batch,
    arrived,
    cost,
    departure,
    food,
    mortality,
    payment,
  }: BatchTypes = req.body;
  const verifyBatch = await findBatch(id!);
  if (!verifyBatch) {
    return res.status(400).json({ message: "Batch not found" });
  }

  const duplicate = await verifyDuplicate(batch);
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate batch" });
  }

  verifyBatch.arrived = arrived;
  verifyBatch.cost = cost;
  verifyBatch.departure = departure;
  verifyBatch.food = food;
  verifyBatch.mortality = mortality;
  verifyBatch.payment = payment;

  await updater(verifyBatch);
  res.json({ message: `${verifyBatch.batch} updated` });
});

export const deleteUser = asyncHandler(async (req: Request, res: any) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Batch ID required" });
  }
  const batch = await findBatch(id);
  if (!batch) {
    return res.status(400).json({ message: "Batch not found" });
  }

  await deleteBatch(batch);
  res.json(`Username ${batch.batch} with ID ${batch._id} deleted`);
});
