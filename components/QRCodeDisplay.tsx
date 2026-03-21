import { useEffect, useRef } from 'react';

export default function QRCodeDisplay({ url, username }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Simple QR code generation (you can use a library like qrcode.react in production)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // For now, just show a placeholder
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 200, 200);
      
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QR Code', 100, 90);
      ctx.font = '12px sans-serif';
      ctx.fillText(`Scan to tip`, 100, 110);
      ctx.fillText(`@${username}`, 100, 130);
      
      // Note: In production, use a real QR code library
      // Example: import QRCode from 'qrcode'
      // QRCode.toCanvas(canvasRef.current, url)
    }
  }, [url, username]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 text-center">
      <h3 className="font-bold text-lg mb-4">📱 Scan to Tip</h3>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="mx-auto rounded-xl border-2 border-gray-200"
      />
      <p className="text-sm text-gray-500 mt-4">
        Point your camera at the QR code to tip
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Works with any wallet app
      </p>
    </div>
  );
}
