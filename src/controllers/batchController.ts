import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

import {
  createBatch,
  dailyFood,
  dailyMortality,
  dailyWeight,
  deleteBatch,
  findBatch,
  getBatches,
  updater,
  verifyDuplicate,
} from "../services/batchServices";
import { BatchTypes } from "../types/batchTypes";

export const getAllBatches = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const batches = await getBatches();

    if (!batches?.length) {
      return res.status(400).json({ message: "No batch found" });
    }
    res.json(batches);
  }
);
export const createNewBatch = asyncHandler(async (req: Request, res: any) => {
  const { aviary, batch, arrived, id }: BatchTypes = req.body;

  if (!batch) {
    return res.status(400).json({ message: "batch is required" });
  }

  if (!aviary) {
    return res.status(400).json({ message: "Aviary is required" });
  }
  const duplicate = await verifyDuplicate(batch);

  if (duplicate) {
    return res.status(409).json({ message: "Batch already exists" });
  }
  const batchObject = { batch, aviary, arrived };
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

export const removeBatch = asyncHandler(async (req: Request, res: any) => {
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

export const daily = asyncHandler(async (req: Request, res: any) => {
  const { id } = req.body;
  const verifyBatch = await findBatch(id);
  if (!verifyBatch) {
    return res.status(400).json({ message: "Batch not found" });
  }

  await dailyMortality(req.body);
  res.json({ message: `${verifyBatch.batch} updated` });
});

export const food = asyncHandler(async (req: Request, res: any) => {
  const { id } = req.body;
  const verifyBatch = await findBatch(id);
  if (!verifyBatch) {
    return res.status(400).json({ message: "Batch not found" });
  }

  await dailyFood(req.body);
  res.json({ message: `${verifyBatch.batch} updated` });
});

export const weight = asyncHandler(async (req: Request, res: any) => {
  const { id } = req.body;
  const verifyBatch = await findBatch(id);
  if (!verifyBatch) {
    return res.status(400).json({ message: "Batch not found" });
  }

  await dailyWeight(req.body);
  res.json({ message: `${verifyBatch.batch} updated` });
});
