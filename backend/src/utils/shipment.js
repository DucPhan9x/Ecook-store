import createHttpError from "http-errors";

export const distanceBetween2Points = (la1, lo1, la2, lo2) => {
  const dLat = (la2 - la1) * (Math.PI / 180);
  const dLon = (lo2 - lo1) * (Math.PI / 180);
  const la1ToRad = la1 * (Math.PI / 180);
  const la2ToRad = la2 * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(la1ToRad) *
      Math.cos(la2ToRad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = 6371 * c;
  return d.toFixed(2);
};
export const getShipmentFee = (distance) => {
  try {
    if (distance < 2) return 0;
    if (distance < 6) return 10000;
    if (distance > 8)
      throw createHttpError(
        400,
        "The distance is over for shipping. Please chose other address!"
      );
    return (1.8 * distance).toFixed(1) * 1000;
  } catch (error) {
    console.log(error);
    throw createHttpError(400, error);
  }
};
