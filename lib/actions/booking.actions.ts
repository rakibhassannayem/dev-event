"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) => {
  try {
    await connectDB();
    const booking = (await Booking.create({ eventId, email })).lean();

    return { success: true, booking };
  } catch (e) {
    console.error("create booking failed", e);
    return { success: false, error: e };
  }
};
