import { multiplyInRange } from './util.js'
import { HSLToHex } from './color_ops.js'

// Manhattan metric
var metrics = {
  'Manhattan': function(x, y) {
    return Math.abs(x) + Math.abs(y)
  },
}

function getAreas(ctx, points, w, h, metric) {
  let areas = new Array(points.length).fill(0)
  let x, y, d, dm, j = 0
  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      dm = metrics[metric](h, w)
      j = -1
      for (var pointId = 0; pointId < points.length; pointId++) {
        d = metrics[metric](points[pointId].x - x, points[pointId].y - y)
        if (d < dm) {
          dm = d
          j = pointId
        }
      }
      areas[j]++
    }
  }
  return areas
}

function drawCenters(ctx, points) {
  ctx.fillStyle = "black";
  for (var i = 0; i < points.length; i++) {
    ctx.fillRect(points[i].x, points[i].y, 3, 3);
  }
}

function drawVoronoi(ctx, points, w, h, metric, areas, hue_range, lightness_range) {
  let x, y, d, dm, j = 0

  let C = new Array(points.length)
  let max_area = Math.max(...areas)
  let hue, saturation, lightness
  saturation = 60;

  for (var i = 0; i < points.length; i++) {
    hue = multiplyInRange(hue_range[0], hue_range[1], i / points.length)
    lightness = multiplyInRange(lightness_range[0], lightness_range[1], areas[i] / max_area)
    C[i] = HSLToHex(hue, saturation, lightness)
  }

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      dm = metrics[metric](h, w)
      j = -1
      for (let pointId = 0; pointId < points.length; pointId++) {
        d = metrics[metric](points[pointId].x - x, points[pointId].y - y)
        if (d < dm) {
          dm = d
          j = pointId
        }
      } //fend i
      ctx.fillStyle = C[j];
      ctx.fillRect(x, y, 1, 1);
    } //fend x
  } //fend y
}

export { getAreas, drawVoronoi, drawCenters }
