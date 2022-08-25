import UserModel from "../models/User";
import AviaryModel from "../models/Aviary";
import asyncHandler from "express-async-handler";
import { Request } from "express";

export const getAllAviaries = asyncHandler(async (req: Request, res: any) => {
  const aviaries = await AviaryModel.find().lean();
  if (!aviaries?.length) {
    return res.status(400).json({ message: "No Aviary found" });
  }
  const aviariesWithUser = await Promise.all(
    aviaries.map(async (aviary) => {
      const user = await UserModel.findById(aviary._id).lean().exec();
      return { ...aviary, username: user?.username };
    })
  );
  res.json(aviariesWithUser);
});

export const createNewAviary = asyncHandler(async (req: Request, res: any) => {
  const { user, title } = req.body;

  if (!user || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await AviaryModel.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate aviary name" });
  }
  const aviary = await AviaryModel.create({ user, title });
  if (aviary) {
    return res.status(201).json({ message: "New aviary created" });
  } else {
    return res.status(400).json({ message: "Invalid aviary data received" });
  }
});

export const updateAviary = asyncHandler(async (req: Request, res: any) => {
  const { id, user, title } = req.body;
  if (!id || !user || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const aviary = await AviaryModel.findById(id).exec();
  if (!aviary) {
    return res.status(400).json({ message: "Aviary not found" });
  }
  const duplicate = await AviaryModel.findOne({ title }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate aviary name" });
  }
  aviary.user = user;
  aviary.title = title;

  const updateAviary = await aviary.save();
  res.json(`${updateAviary.title} updated`);
});

export const deleteAviary = asyncHandler(async (req: Request, res: any) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Aviary ID required" });
  }
  const aviary = await AviaryModel.findById(id).exec();
  if (!aviary) {
    return res.status(400).json({ message: "Aviary not found" });
  }
  const result = await aviary.deleteOne();
  const reply = `Aviary ${result.title}, with ID ${result._id} deleted`;
  res.json(reply);
});
