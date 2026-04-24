/* ai-recognize.js — AI东巴文字识别模块
 * 将用户绘制和参考SVG统一渲染为像素，在同一特征空间内做相似度比对
 */

(function(global) {
  'use strict';

  var GRID_SIZE = 8;        // 密度网格分辨率
  var NORM_SIZE = 64;       // 标准化渲染尺寸
  var CACHE_KEY = '__dongbaRenderCache';

  // ======== 图像预处理 ========

  // 获取二值化矩阵（1=笔画, 0=空白），同时返回边界框
  function getBinaryMatrix(imageData, w, h) {
    var mat = new Uint8Array(w * h);
    var minX = w, minY = h, maxX = -1, maxY = -1;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var idx = (y * w + x) * 4;
        // 任意通道偏暗即为笔画
        var isStroke = imageData[idx] < 200 || imageData[idx + 1] < 200 || imageData[idx + 2] < 200;
        if (isStroke) {
          mat[y * w + x] = 1;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return {
      mat: mat, w: w, h: h,
      bbox: { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }
    };
  }

  // 裁剪并缩放到标准尺寸，居中保持比例
  function normalizeBinary(binary) {
    var bb = binary.bbox;
    if (bb.w <= 0 || bb.h <= 0) return null;

    var pad = 6;
    var sx = Math.max(0, bb.x - pad);
    var sy = Math.max(0, bb.y - pad);
    var sw = Math.min(binary.w - sx, bb.w + pad * 2);
    var sh = Math.min(binary.h - sy, bb.h + pad * 2);

    // 创建标准画布
    var canvas = document.createElement('canvas');
    canvas.width = NORM_SIZE;
    canvas.height = NORM_SIZE;
    var ctx = canvas.getContext('2d');

    // 计算缩放，保持比例并居中
    var scale = Math.min((NORM_SIZE - 8) / sw, (NORM_SIZE - 8) / sh);
    var dw = sw * scale;
    var dh = sh * scale;
    var dx = (NORM_SIZE - dw) / 2;
    var dy = (NORM_SIZE - dh) / 2;

    // 用 ImageData 方式手动缩放（避免 canvas drawImage 依赖）
    var srcMat = binary.mat;
    var srcW = binary.w;
    var normMat = new Uint8Array(NORM_SIZE * NORM_SIZE);

    for (var ny = 0; ny < NORM_SIZE; ny++) {
      for (var nx = 0; nx < NORM_SIZE; nx++) {
        // 映射回源坐标
        var srcXf = sx + (nx - dx) / scale;
        var srcYf = sy + (ny - dy) / scale;
        // 2x2 采样
        var x0 = Math.floor(srcXf), y0 = Math.floor(srcYf);
        var x1 = x0 + 1, y1 = y0 + 1;
        var count = 0;
        if (x0 >= 0 && x0 < binary.w && y0 >= 0 && y0 < binary.h && srcMat[y0 * srcW + x0]) count++;
        if (x1 >= 0 && x1 < binary.w && y0 >= 0 && y0 < binary.h && srcMat[y0 * srcW + x1]) count++;
        if (x0 >= 0 && x0 < binary.w && y1 >= 0 && y1 < binary.h && srcMat[y1 * srcW + x0]) count++;
        if (x1 >= 0 && x1 < binary.w && y1 >= 0 && y1 < binary.h && srcMat[y1 * srcW + x1]) count++;
        if (count >= 2) normMat[ny * NORM_SIZE + nx] = 1;
      }
    }
    return normMat;
  }

  // ======== SVG 渲染 ========

  // 将SVG渲染为NORM_SIZE x NORM_SIZE的二值矩阵
  function renderSvgToBinary(svgStr) {
    var fullSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="' + NORM_SIZE + '" height="' + NORM_SIZE + '">' + svgStr + '</svg>';
    var blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(blob);

    var canvas = document.createElement('canvas');
    canvas.width = NORM_SIZE;
    canvas.height = NORM_SIZE;
    var ctx = canvas.getContext('2d');

    return new Promise(function(resolve) {
      var img = new Image();
      img.onload = function() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, NORM_SIZE, NORM_SIZE);
        ctx.drawImage(img, 0, 0, NORM_SIZE, NORM_SIZE);
        URL.revokeObjectURL(url);
        var imgData = ctx.getImageData(0, 0, NORM_SIZE, NORM_SIZE).data;
        var binary = getBinaryMatrix(imgData, NORM_SIZE, NORM_SIZE);
        resolve(normalizeBinary(binary));
      };
      img.onerror = function() {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  }

  // 预渲染所有字符（带缓存）
  function ensureCache() {
    if (global[CACHE_KEY] && global[CACHE_KEY]._ready) {
      return Promise.resolve(global[CACHE_KEY]);
    }
    if (!global.DONGBA_DB) return Promise.resolve(null);

    // 去重：同一cn取第一个
    var seen = {};
    var unique = global.DONGBA_DB.filter(function(d) {
      if (seen[d.cn]) return false;
      seen[d.cn] = true;
      return true;
    });

    var cache = { _ready: false, data: {} };
    global[CACHE_KEY] = cache;

    var promises = unique.map(function(char) {
      return renderSvgToBinary(char.svg).then(function(binary) {
        if (binary) {
          cache.data[char.cn] = {
            binary: binary,
            char: char
          };
        }
      });
    });

    return Promise.all(promises).then(function() {
      cache._ready = true;
      return cache;
    });
  }

  // ======== 特征提取 ========

  function extractFeatures(normMat) {
    if (!normMat) return null;

    var features = {
      // 8x8 密度网格
      density: new Float32Array(GRID_SIZE * GRID_SIZE),
      // 水平投影（归一化）
      hProj: new Float32Array(NORM_SIZE),
      // 垂直投影（归一化）
      vProj: new Float32Array(NORM_SIZE),
      // 径向分布（从中心到边缘分4环）
      radial: new Float32Array(4),
      // 象限密度
      quadrants: new Float32Array(4),
      // 总笔画密度
      totalDensity: 0,
      // 宽高比
      aspectRatio: 1,
      // 重心
      cx: 0.5, cy: 0.5
    };

    var cellW = NORM_SIZE / GRID_SIZE;
    var cellH = NORM_SIZE / GRID_SIZE;
    var centerX = NORM_SIZE / 2, centerY = NORM_SIZE / 2;
    var maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
    var sumX = 0, sumY = 0, totalCount = 0;

    // 边界框
    var bx0 = NORM_SIZE, by0 = NORM_SIZE, bx1 = 0, by1 = 0;

    for (var y = 0; y < NORM_SIZE; y++) {
      var rowSum = 0;
      for (var x = 0; x < NORM_SIZE; x++) {
        var v = normMat[y * NORM_SIZE + x];
        if (!v) continue;

        totalCount++;
        sumX += x; sumY += y;
        if (x < bx0) bx0 = x;
        if (x > bx1) bx1 = x;
        if (y < by0) by0 = y;
        if (y > by1) by1 = y;

        // 密度网格
        var gx = Math.min(GRID_SIZE - 1, (x / cellW) | 0);
        var gy = Math.min(GRID_SIZE - 1, (y / cellH) | 0);
        features.density[gy * GRID_SIZE + gx] += 1;

        // 径向分布
        var dx = x - centerX, dy = y - centerY;
        var dist = Math.sqrt(dx * dx + dy * dy) / maxRadius;
        var ring = Math.min(3, (dist * 4) | 0);
        features.radial[ring] += 1;

        // 象限
        var qi = (y < centerY ? 0 : 2) + (x < centerX ? 0 : 1);
        features.quadrants[qi] += 1;

        // 投影
        features.hProj[y] += 1;
        features.vProj[x] += 1;
      }
    }

    if (totalCount === 0) return null;

    // 归一化
    var cellArea = cellW * cellH;
    for (var i = 0; i < features.density.length; i++) {
      features.density[i] /= cellArea;
    }
    for (var i = 0; i < features.hProj.length; i++) {
      features.hProj[i] /= NORM_SIZE;
    }
    for (var i = 0; i < features.vProj.length; i++) {
      features.vProj[i] /= NORM_SIZE;
    }
    for (var i = 0; i < features.radial.length; i++) {
      features.radial[i] /= totalCount;
    }
    for (var i = 0; i < features.quadrants.length; i++) {
      features.quadrants[i] /= totalCount;
    }

    features.totalDensity = totalCount / (NORM_SIZE * NORM_SIZE);
    features.cx = sumX / totalCount / NORM_SIZE;
    features.cy = sumY / totalCount / NORM_SIZE;

    var bw = bx1 - bx0 + 1, bh = by1 - by0 + 1;
    features.aspectRatio = bh > 0 ? bw / bh : 1;

    return features;
  }

  // ======== 相似度计算 ========

  // 余弦相似度
  function cosineSim(a, b) {
    var dot = 0, na = 0, nb = 0;
    for (var i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    var denom = Math.sqrt(na) * Math.sqrt(nb);
    return denom > 0 ? dot / denom : 0;
  }

  // 归一化互相关
  function crossCorrelate(a, b) {
    var len = a.length;
    var meanA = 0, meanB = 0;
    for (var i = 0; i < len; i++) { meanA += a[i]; meanB += b[i]; }
    meanA /= len; meanB /= len;

    var num = 0, da = 0, db = 0;
    for (var i = 0; i < len; i++) {
      var va = a[i] - meanA;
      var vb = b[i] - meanB;
      num += va * vb;
      da += va * va;
      db += vb * vb;
    }
    var denom = Math.sqrt(da) * Math.sqrt(db);
    return denom > 0 ? num / denom : 0;
  }

  function computeSimilarity(fDraw, fRef) {
    // 1. 密度网格余弦相似度（权重最高）
    var densitySim = cosineSim(fDraw.density, fRef.density);

    // 2. 水平投影互相关
    var hProjSim = crossCorrelate(fDraw.hProj, fRef.hProj);

    // 3. 垂直投影互相关
    var vProjSim = crossCorrelate(fDraw.vProj, fRef.vProj);

    // 4. 径向分布相似度
    var radialSim = cosineSim(fDraw.radial, fRef.radial);

    // 5. 象限分布相似度
    var quadSim = cosineSim(fDraw.quadrants, fRef.quadrants);

    // 6. 重心距离
    var cDist = Math.sqrt(
      Math.pow(fDraw.cx - fRef.cx, 2) + Math.pow(fDraw.cy - fRef.cy, 2)
    );
    var centroidSim = Math.max(0, 1 - cDist * 2);

    // 7. 密度范围接近度
    var densDiff = Math.abs(fDraw.totalDensity - fRef.totalDensity);
    var densSim = Math.max(0, 1 - densDiff * 5);

    // 8. 宽高比接近度
    var arDiff = Math.abs(fDraw.aspectRatio - fRef.aspectRatio);
    var arSim = Math.max(0, 1 - arDiff);

    // 加权综合
    var score =
      densitySim * 0.25 +
      hProjSim  * 0.15 +
      vProjSim  * 0.15 +
      radialSim * 0.12 +
      quadSim   * 0.10 +
      centroidSim * 0.08 +
      densSim   * 0.08 +
      arSim     * 0.07;

    return score;
  }

  // ======== 像素级模板匹配（精细比对） ========

  function pixelSimilarity(matA, matB) {
    var match = 0, total = 0;
    for (var i = 0; i < NORM_SIZE * NORM_SIZE; i++) {
      var a = matA[i], b = matB[i];
      // 都有笔画
      if (a && b) match += 2;
      // 一个有一个没有
      else if (a || b) match -= 1;
      // 都空白忽略
      total += 2;
    }
    return total > 0 ? Math.max(0, match / total) : 0;
  }

  // ======== 主识别函数 ========

  function recognizeDrawing(canvas) {
    if (!canvas || !global.DONGBA_DB) return [];

    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    var imgData;
    try {
      imgData = ctx.getImageData(0, 0, w, h).data;
    } catch (e) {
      return [];
    }

    // 二值化 & 裁剪
    var binary = getBinaryMatrix(imgData, w, h);
    if (binary.bbox.w <= 0 || binary.bbox.h <= 0) return [];

    var normMat = normalizeBinary(binary);
    if (!normMat) return [];

    var drawFeatures = extractFeatures(normMat);
    if (!drawFeatures) return [];

    // 确保缓存就绪后进行匹配
    return ensureCache().then(function(cache) {
      if (!cache) return [];

      var results = [];
      var keys = Object.keys(cache.data);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var entry = cache.data[key];
        if (!entry.binary) continue;

        var refFeatures = extractFeatures(entry.binary);
        if (!refFeatures) continue;

        // 特征级相似度
        var featureSim = computeSimilarity(drawFeatures, refFeatures);

        // 像素级相似度
        var pixelSim = pixelSimilarity(normMat, entry.binary);

        // 综合得分（像素匹配权重更高）
        var confidence = featureSim * 0.55 + pixelSim * 0.45;

        if (confidence > 0.15) {
          results.push({
            cn: entry.char.cn,
            pinyin: entry.char.pinyin,
            en: entry.char.en,
            svg: entry.char.svg,
            confidence: confidence,
            cat: entry.char.cat
          });
        }
      }

      results.sort(function(a, b) {
        return b.confidence - a.confidence;
      });

      return results.slice(0, 5);
    });
  }

  // ======== 导出 ========

  global.RecognizeDongba = {
    recognize: recognizeDrawing,
    ensureCache: ensureCache
  };

})(typeof window !== 'undefined' ? window : global);
