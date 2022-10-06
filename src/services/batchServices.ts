import BatchModel from "../models/Batch";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/httpException";
import { BatchTypes } from "../types/batchTypes";

export async function getBatches() {
  // export async function getBatches(): Promise<BatchTypes[]> {
  try {
    const batches = await BatchModel.find().lean().exec();
    return batches;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function createBatch(data: Partial<BatchTypes>): Promise<any> {
  const batchObject = {
    aviary: data.aviary,
    batch: data.batch,
    arrived: data.arrived,
    id: data.id,
  };

  try {
    const newBatch = await BatchModel.create(batchObject);
    return {
      // _id: newBatch._id,
      aviary: data.aviary,
      batch: newBatch.batch,
      arrived: newBatch.arrived,
    };
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function verifyDuplicate(batch: string): Promise<any> {
  try {
    const verifiedBatch = await BatchModel.findOne({ batch })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();
    return verifiedBatch;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function findBatch(id: string) {
  try {
    const batch = await BatchModel.findById(id).exec();
    return batch;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function findBatchByName(batch: string) {
  try {
    const user = await BatchModel.findOne({ batch }).exec();
    return user;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function deleteBatch(batch: any) {
  try {
    batch.deleteOne();
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function updater(batch: any) {
  try {
    // await UserModel.updateOne(user);
    await batch.save();
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function dailyMortality(batch: any) {
  const report = {
    natural: batch.natural,
    locomotor: batch.locomotor,
    cachectic: batch.cachectic,
    date: batch.date,
    // id: batch.id,
  };

  try {
    await BatchModel.updateOne(
      { _id: batch.id },
      { $addToSet: { mortality: report } }
    );
  } catch (err) {
    throw ErrorHandler(err);
  }
}
export async function dailyFood(batch: any) {
  const report = {
    quantity: batch.quantity,
    date: batch.date,
    // id: batch.id,
  };

  try {
    await BatchModel.updateOne(
      // { _id: Object.assign(batch.id) },
      { _id: batch.id },
      { $addToSet: { food: report } }
    );
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function dailyWeight(batch: any) {
  const report = {
    value: batch.value,
    date: batch.date,
    // id: batch.id,
  };

  try {
    await BatchModel.updateOne(
      // { _id: Object.assign(batch.id) },
      { _id: batch.id },
      { $addToSet: { weight: report } }
    );
  } catch (err) {
    throw ErrorHandler(err);
  }
}
