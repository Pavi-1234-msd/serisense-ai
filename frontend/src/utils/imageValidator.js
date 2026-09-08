/**
 * Enhanced Image Validator for Mulberry Leaf Disease Detection
 * Detects non-leaf photos (human portraits, skin tones, charts, documents, artificial objects, and non-vegetation).
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
          let humanSkinPixels = 0;
          let blueSkyOrShirtPixels = 0;
          let leafVegetationPixels = 0; // True plant chlorophyll green, rust brown, or diseased yellow-brown
          let totalSaturation = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const maxRGB = Math.max(r, g, b);
            const minRGB = Math.min(r, g, b);
            const chroma = maxRGB - minRGB;
            const saturation = maxRGB === 0 ? 0 : chroma / maxRGB;
            totalSaturation += saturation;

            // 1. Check for Document / Chart / White / Gray background
            if (r > 200 && g > 200 && b > 200) {
              whiteOrGrayPixels++;
            } else if (chroma < 18 && (r > 100 || g > 100 || b > 100)) {
              whiteOrGrayPixels++;
            }

            // 2. Human Skin Tone Detection (Standard RGB Peer/Kovac Rule)
            // Conditions: R > 95, G > 40, B > 20; Max - Min > 15; |R - G| > 15; R > G; R > B
            const isSkin = (
              r > 80 && g > 40 && b > 20 &&
              chroma > 15 &&
              Math.abs(r - g) > 12 &&
              r > g && g > b
            );
            if (isSkin) {
              humanSkinPixels++;
            }

            // 3. Artificial Blue / Background Sky / Clothing
            if (b > 110 && b > r * 1.25 && b > g * 1.15) {
              blueSkyOrShirtPixels++;
            }

            // 4. True Foliar / Mulberry Leaf Colors:
            // - Active Chlorophyll Green: (g > r and g > b) with healthy leaf saturation
            const isGreenLeaf = (g > r * 1.02) && (g > b * 1.15) && (g > 40);
            
            // - Leaf Rust (Cerotelium fici): Golden-yellowish / brownish pustules with green context
            // Leaves have high green or olive presence, unlike skin which is red-dominated over green
            const isLeafRustPustule = (
              r > 90 && g > 75 && b < 70 &&
              Math.abs(r - g) < 45 && // Yellow-brown hues (R and G close together)
              (g > b * 1.3)
            );

            // - Necrotic Leaf Spot (Cercospora moricola): Dark brownish/black spots surrounded by green/pale halo
            const isLeafNecrosis = (
              r < 90 && g < 85 && b < 70 &&
              chroma < 30 &&
              (g >= b * 0.9)
            );

            if (isGreenLeaf || isLeafRustPustule || isLeafNecrosis) {
              leafVegetationPixels++;
            }
          }

          const whiteGrayRatio = whiteOrGrayPixels / totalPixels;
          const skinRatio = humanSkinPixels / totalPixels;
          const blueRatio = blueSkyOrShirtPixels / totalPixels;
          const vegetationRatio = leafVegetationPixels / totalPixels;
          const avgSaturation = totalSaturation / totalPixels;

          // RULE A: Human Face / Portrait / Skin Detection
          // If > 18% of image matches skin tones and vegetation is low
          if (skinRatio > 0.18 && vegetationRatio < 0.22) {
            resolve({
              isLeaf: false,
              reason: 'Human subject or portrait detected. Please upload a clear photo of a mulberry leaf.',
              confidenceScore: Math.round(skinRatio * 100)
            });
            return;
          }

          // RULE B: Document / Chart / Paper Screenshot
          if (whiteGrayRatio > 0.55 && vegetationRatio < 0.20) {
            resolve({
              isLeaf: false,
              reason: 'Image appears to be a chart, graph, or document screenshot. Please upload a mulberry leaf photo.',
              confidenceScore: Math.round((1 - whiteGrayRatio) * 100)
            });
            return;
          }

          // RULE C: Blue background / clothing with no plant matter
          if (blueRatio > 0.35 && vegetationRatio < 0.15) {
            resolve({
              isLeaf: false,
              reason: 'Image shows non-agricultural subject (clothing/background). Please upload a mulberry leaf photo.',
              confidenceScore: Math.round(blueRatio * 100)
            });
            return;
          }

          // RULE D: Minimum Leaf Vegetation Threshold
          // A real mulberry leaf filling the frame should have at least 15% plant foliar colors
          if (vegetationRatio < 0.15 && skinRatio > 0.10) {
            resolve({
              isLeaf: false,
              reason: 'No clear mulberry leaf foliage found in this image. Please upload a clear leaf photo.',
              confidenceScore: Math.round(vegetationRatio * 100)
            });
            return;
          }

          if (vegetationRatio < 0.12 && avgSaturation < 0.22) {
            resolve({
              isLeaf: false,
              reason: 'No leaf features or plant vegetation colors detected. Please upload a mulberry leaf.',
              confidenceScore: Math.round(vegetationRatio * 100)
            });
            return;
          }

          // Passed all checks - valid leaf photo
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