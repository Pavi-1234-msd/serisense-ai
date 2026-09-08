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

          // STRICT LEAF VALIDATION RULES
          // 1. Check if the image contains dominant plant foliar colors
          // A genuine mulberry leaf (healthy or diseased) is dominated by plant pigments (chlorophyll green, foliar rust brown, or diseased necrotic halos)
          
          // ID Card / White Document / Grey Wall background
          if (whiteGrayRatio > 0.40) {
            resolve({
              isLeaf: false,
              reason: 'Background contains paper, card, text, or wall surface. Please upload a close-up photo of a mulberry leaf.',
              confidenceScore: Math.round((1 - whiteGrayRatio) * 100)
            });
            return;
          }

          // Human face / skin tone check (even small faces or ID cards have skin pixels > 5%)
          if (skinRatio > 0.06) {
            resolve({
              isLeaf: false,
              reason: 'Human subject or portrait detected. Please upload a photo of a mulberry leaf only.',
              confidenceScore: Math.round(skinRatio * 100)
            });
            return;
          }

          // Non-agricultural blue / dark clothing check
          if (blueRatio > 0.15) {
            resolve({
              isLeaf: false,
              reason: 'Non-agricultural clothing or artificial background detected. Please upload a mulberry leaf photo.',
              confidenceScore: Math.round(blueRatio * 100)
            });
            return;
          }

          // Strict foliar threshold: Genuine mulberry leaf photo must have at least 25% plant foliage pixels
          if (vegetationRatio < 0.25) {
            resolve({
              isLeaf: false,
              reason: 'No clear mulberry leaf foliage detected in this photo. Please ensure the leaf fills the camera frame.',
              confidenceScore: Math.round(vegetationRatio * 100)
            });
            return;
          }

          // Passed all checks - valid leaf photo
          resolve({
            isLeaf: true,
            reason: 'Leaf features verified successfully',
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