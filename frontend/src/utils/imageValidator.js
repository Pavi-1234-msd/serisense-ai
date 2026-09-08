/**
 * Image Validator for Mulberry Leaf Disease Detection
 * Analyzes uploaded image pixel colors to detect non-leaf photos (charts, text documents, solid colors, non-vegetation).
 */

export const validateIsLeafImage = (imageFile) => {
  return new Promise((resolve) => {
    if (!imageFile) {
      resolve({ isLeaf: true, reason: 'No file provided' });
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve({ isLeaf: true, reason: 'File read error, allowing model fallback' });
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve({ isLeaf: true, reason: 'Image load error' });
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const sampleSize = 100;
          canvas.width = sampleSize;
          canvas.height = sampleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

          const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
          const data = imageData.data;
          const totalPixels = sampleSize * sampleSize;

          let whiteOrGrayPixels = 0;
          let vegetationPixels = 0; // Greenish, yellowish, or leaf-rust brownish
          let totalSaturation = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // 1. Check for Document / Chart / White / Gray background
            // High brightness and low color difference (monochrome/gray/white)
            const maxRGB = Math.max(r, g, b);
            const minRGB = Math.min(r, g, b);
            const chroma = maxRGB - minRGB;
            const saturation = maxRGB === 0 ? 0 : chroma / maxRGB;
            totalSaturation += saturation;

            if (r > 200 && g > 200 && b > 200) {
              whiteOrGrayPixels++;
            } else if (chroma < 18 && (r > 120 || g > 120 || b > 120)) {
              whiteOrGrayPixels++;
            }

            // 2. Check for Organic Plant / Leaf Color spectrum:
            // - Greenish (g > r and g > b)
            // - Leaf Rust brownish/yellowish (r > b, g > b*0.7, r > 60)
            const isGreenish = (g > r * 0.95) && (g > b * 1.1) && (g > 35);
            const isRustBrown = (r > b * 1.3) && (g > b * 0.9) && (r > 50) && (r < 235);
            const isYellowGreen = (r > 80 && g > 80 && b < r * 0.8 && b < g * 0.8);

            if (isGreenish || isRustBrown || isYellowGreen) {
              vegetationPixels++;
            }
          }

          const whiteGrayRatio = whiteOrGrayPixels / totalPixels;
          const vegetationRatio = vegetationPixels / totalPixels;
          const avgSaturation = totalSaturation / totalPixels;

          // Evaluation logic:
          // If > 55% of the image is pure white/gray (like charts, documents, paper)
          // OR if vegetation color ratio is extremely low (< 10%) AND average saturation is low (< 0.18)
          if (whiteGrayRatio > 0.55 && vegetationRatio < 0.25) {
            resolve({
              isLeaf: false,
              reason: 'Image appears to be a chart, graph, or document screenshot.',
              confidenceScore: Math.round((1 - whiteGrayRatio) * 100)
            });
            return;
          }

          if (vegetationRatio < 0.08 && avgSaturation < 0.18) {
            resolve({
              isLeaf: false,
              reason: 'No leaf features or plant vegetation colors detected.',
              confidenceScore: Math.round(vegetationRatio * 100)
            });
            return;
          }

          resolve({
            isLeaf: true,
            reason: 'Leaf features detected',
            confidenceScore: Math.round(vegetationRatio * 100)
          });
        } catch (err) {
          resolve({ isLeaf: true, reason: 'Validation fallback' });
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};