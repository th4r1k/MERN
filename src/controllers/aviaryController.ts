import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { AviaryType } from "../types/aviaryTypes";
import {
  avUpdater,
  createAviary,
  deleteAv,
  findAviary,
  getAviaries,
  verifyDuplicateAv,
} from "../services/aviaryServices";
import { findUser } from "../services/usersServices";

export const getAllAviaries = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const aviaries = await getAviaries();
    if (!aviaries?.length) {
      return res.status(400).json({ message: "No Aviary found" });
    }

    const aviariesWithUser = await Promise.all(
      aviaries.map(async (aviary) => {
        const user = await findUser(aviary._id);
        return { ...aviary, username: user?.username };
      })
    );
    res.json(aviariesWithUser);
  }
);

export const createNewAviary = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { user, title }: AviaryType = req.body;

    if (!user || !title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await verifyDuplicateAv(title);
    if (duplicate) {
      return res.status(409).json({ message: "Duplicate aviary name" });
    }

    const aviary = await createAviary({ user, title });
    if (aviary) {
      return res.status(201).json({ message: "New aviary created" });
    } else {
      return res.status(400).json({ message: "Invalid aviary data received" });
    }
  }
);

export const updateAviary = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id, user, title }: AviaryType = req.body;

    if (!id || !user || !title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const aviary = await findAviary(id);
    if (!aviary) {
      return res.status(400).json({ message: "Aviary not found" });
    }

    const duplicate = await verifyDuplicateAv(title);
    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate aviary name" });
    }

    if (aviary.user !== user) {
      return res.status(400).json({ message: "Wrong user" });
    }

    aviary.user = user;
    aviary.title = title;

    await avUpdater(aviary);

    res.json(`${aviary.title} updated ${aviary.user}`);
  }
);

export const deleteAviary = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Aviary ID required" });
    }

    const aviary = await findAviary(id);
    if (!aviary) {
      return res.status(400).json({ message: "Aviary not found" });
    }

    await deleteAv(aviary);
    const reply = `Aviary ${aviary.title}, with ID ${aviary._id} deleted`;
    res.json(reply);
  }
);
