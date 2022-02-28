import useNotification from "hooks/useNotification";

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
    if (distance < 2) return 0; // 2km
    if (distance < 6) return 10000; // 6 km
    if (distance > 8) {
      useNotification.Error({
        title: "Error",
        message:
          "Xin lỗi vì vị trí giao hàng của bạn xa hơn 8km, chúng tôi không phục vụ giao hàng được.!",
      });
      return -1;
    }

    return (1.8 * distance).toFixed(1) * 1000;
  } catch (error) {
    useNotification.Error({
      title: "Error",
      message: error,
    });
    return -1;
  }
};
export const ADDRESS_ECOOK_SYSTEM = {
  lat: 16.0711691,
  lng: 108.1483103,
};
