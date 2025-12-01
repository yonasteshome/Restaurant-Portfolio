const QRCode = require("qrcode");

exports.generateQRCode = async (restaurantId) => {
  const redirectURL = `${process.env.FRONTEND_URL}/menu/${restaurantId}`; 
  const qrImage = await QRCode.toDataURL(redirectURL);
  return qrImage;
};
