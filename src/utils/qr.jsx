import { QRCodeCanvas } from 'qrcode.react';

export const ShareQRCode = ({ url, size = 200 }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-[0_0_15px_#ff006e] inline-block">
      <QRCodeCanvas
        value={url}
        size={size}
        bgColor={"#ffffff"}
        fgColor={"#050510"}
        level={"H"}
        includeMargin={false}
      />
    </div>
  );
};
