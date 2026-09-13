/**
 * SeriSense AI — Mulberry Leaf Image Validator
 * Filters out non-leaf images (human portraits/skin, non-agricultural objects,
 * documents, screenshots, and plain backgrounds) before AI model processing.
 */

export const validateIsLeafImage = (imageFile) => {
  return new Promise((resolve) => {
    if (!imageFile) {
      resolve({ isLeaf: true, reason: 'No file provided' });
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve({ isLeaf: true, reason: 'File read error' });

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

          let whiteOrGrayPixels  = 0;
          let blackPixels        = 0;
          let skinPixels         = 0;
          let artificialPixels   = 0; // Blue, purple, cyan, vibrant magenta (non-foliar)
          let validLeafPixels    = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const maxRGB = Math.max(r, g, b);
            const minRGB = Math.min(r, g, b);
            const chroma = maxRGB - minRGB;

            // 1. Pure white / document / screenshot pixels
            if (r > 220 && g > 220 && b > 220) {
              whiteOrGrayPixels++;
              continue;
            }

            // 2. Near-gray pixels (paper, wall, card surface)
            if (chroma < 12 && r > 130 && g > 130 && b > 130) {
              whiteOrGrayPixels++;
              continue;
            }

            // 3. Near-black pixels (dark background / shadow)
            if (r < 25 && g < 25 && b < 25) {
              blackPixels++;
              continue;
            }

            // 4. Non-foliar unnatural colors (Blue sky, clothing, cars, electronic screens)
            // Leaves never have strong blue or pure purple tones
            if ((b > r * 1.15 && b > g * 1.15 && b > 60) || (b > 130 && chroma > 40 && b > g)) {
              artificialPixels++;
              continue;
            }

            // 5. Human Skin Tone Detection (Standard RGB skin color heuristic)
            // Skin characteristics: R > 85, G > 40, B > 20, R > G > B, and (R - G) distinct
            const isSkin = (
              r > 85 && g > 40 && b > 20 &&
              r > g && g > b &&
              (r - g) > 12 && (r - g) < 85 &&
              (r - b) > 20
            );

            // 6. Foliar / Mulberry Leaf Colors:
            // Healthy Green
            const isGreen = (g > r * 1.02) && (g > b * 1.15) && (g > 35);

            // Leaf Rust: orange/reddish-brown rust pustules (must have sufficient rust chroma, not smooth skin)
            const isRust = (
              r > 75 && r > b * 1.4 &&
              g > 40 && g < r * 0.92 &&
              b < 80 &&
              (r - b) > 40
            );

            // Leaf Spot: dark brown necrotic spots
            const isDarkSpot = (
              r > 20 && r < 110 &&
              g > 15 && g < 90 &&
              b < 70 &&
              chroma > 8 &&
              Math.abs(r - g) < 40
            );

            // Yellow-green diseased or senescent leaf
            const isYellowGreen = (
              r > 75 && g > 85 && b < 100 &&
              g >= r * 0.88 &&
              chroma > 15
            );

            // Olive / deep green
            const isOlive = (
              r > 25 && r < 120 &&
              g > 35 && g < 140 &&
              b < 95 &&
              g >= r * 0.75
            );

            if (isSkin && !isGreen) {
              skinPixels++;
            } else if (isGreen || isRust || isDarkSpot || isYellowGreen || isOlive) {
              validLeafPixels++;
            }
          }

          const whiteGrayRatio  = whiteOrGrayPixels / totalPixels;
          const blackRatio      = blackPixels / totalPixels;
          const skinRatio       = skinPixels / totalPixels;
          const artificialRatio = artificialPixels / totalPixels;
          const validLeafRatio  = validLeafPixels / totalPixels;

          // ── REJECTION CHECKS ──────────────────────────────────────────

          // Check 1: Human portrait / face / selfie detected
          if (skinRatio > 0.18 && validLeafRatio < 0.25) {
            resolve({
              isLeaf: false,
              reason: 'Human portrait or person photo detected. Please upload clear photos of mulberry leaves.',
              confidenceScore: Math.round(validLeafRatio * 100)
            });
            return;
          }

          // Check 2: Unnatural / non-plant colors dominant (blue sky, clothes, tech gadgets)
          if (artificialRatio > 0.25 && validLeafRatio < 0.20) {
            resolve({
              isLeaf: false,
              reason: 'Non-plant image detected (clothing, sky, or artificial object). Please upload mulberry leaves.',
              confidenceScore: Math.round(validLeafRatio * 100)
            });
            return;
          }

          // Check 3: Mostly white / document / screenshot / card
          if (whiteGrayRatio > 0.65) {
            resolve({
              isLeaf: false,
              reason: 'Image appears to be a document, screenshot, or plain background. Please upload a close-up photo of a mulberry leaf.',
              confidenceScore: Math.round(validLeafRatio * 100)
            });
            return;
          }

          // Check 4: Extremely dark / covered lens
          if (blackRatio > 0.80) {
            resolve({
              isLeaf: false,
              reason: 'Image is too dark. Please take a photo of mulberry leaves in good lighting.',
              confidenceScore: 5
            });
            return;
          }

          // Check 5: General lack of mulberry foliar features
          if (validLeafRatio < 0.12) {
            resolve({
              isLeaf: false,
              reason: 'No mulberry leaf features detected in the image. Please upload a clear photo of mulberry leaves.',
              confidenceScore: Math.round(validLeafRatio * 100)
            });
            return;
          }

          // ── Accepted: Passes foliar check, ready for MobileNetV2 model ──
          resolve({
            isLeaf: true,
            reason: 'Valid leaf image accepted for AI classification',
            confidenceScore: Math.round(validLeafRatio * 100)
          });

        } catch (err) {
          // Fallback if canvas extraction encounters an issue
          resolve({ isLeaf: true, reason: 'Validation error — model fallback' });
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(imageFile);
  });
};