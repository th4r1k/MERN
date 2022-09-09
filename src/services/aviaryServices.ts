import AviaryModel from "../models/Aviary";
import { ErrorHandler } from "../utils/httpException";
import { AviaryReturnType, AviaryType } from "../types/aviaryTypes";

export async function getAviaries() {
  try {
    const aviaries = await AviaryModel.find().lean();
    return aviaries;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function createAviary({ user, title }: AviaryType) {
  try {
    const aviary = await AviaryModel.create({ user, title });
    return aviary;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function verifyDuplicateAv(
  title: string
): Promise<AviaryReturnType | null> {
  try {
    const aviary = await AviaryModel.findOne({ title })
      .collation({ locale: "en", strength: 2 })
      .exec();
    return aviary;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function findAviary(id: string) {
  try {
    const user = await AviaryModel.findById(id).exec();
    return user;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function avUpdater(aviary: any) {
  try {
    await aviary.save();
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function deleteAv(aviary: any) {
  try {
    await aviary.deleteOne();
  } catch (err) {
    throw ErrorHandler(err);
  }
}
