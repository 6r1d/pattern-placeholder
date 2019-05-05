import { multiplyInRange } from './util.js'
import { HSLToHex } from './color_ops.js'

// Manhattan metric
var metrics = {
  'Euclidean': function(x, y) {
      return Math.sqrt(x*x + y*y)
  },
  'Manhattan': function(x, y) {
      return Math.abs(x) + Math.abs(y)
  },
  'Minkovski': function(x, y) {
      return(
          Math.pow(
            Math.pow(Math.abs(x),3) + Math.pow(Math.abs(y),3),
            0.33333
          )
      )
  }
}

function getAreas(ctx, points, width, height, metric) {
  let areas = new Array(points.length).fill(0)
  let x, y, distanceMetric, cellId = 0
  let distance = 0
  let initialDistanceMetric = metrics[metric](height, width)
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      // Set initial values for distance metric output and cell id
      distanceMetric = initialDistanceMetric
      cellId = -1
      // Iterate points
      for (let pointId = 0; pointId < points.length; pointId++) {
        distance = metrics[metric](points[pointId].x - x, points[pointId].y - y)
        // Current point found in points list, remember it
        if (distance < distanceMetric) {
          distanceMetric = distance
          cellId = pointId
        }
      }
      areas[cellId]++
    } //fend x
  } //fend y


  return areas
}

function drawCenters(ctx, points) {
  ctx.fillStyle = "black";
  for (var i = 0; i < points.length; i++) {
    ctx.fillRect(points[i].x, points[i].y, 3, 3);
  }
}

function drawVoronoi(ctx, points, width, height, metric, areas, hue_range, lightness_range) {
  let x, y, distanceMetric, cellId = 0

  let C = new Array(points.length)
  let max_area = Math.max(...areas)
  let hue, saturation, lightness
  saturation = 60;

  for (var i = 0; i < points.length; i++) {
    hue = multiplyInRange(hue_range[0], hue_range[1], i / points.length)
    lightness = multiplyInRange(
      lightness_range[0],
      lightness_range[1],
      areas[i] / max_area
    )
    C[i] = HSLToHex(hue, saturation, lightness)
  }

  let distance = 0
  let initialDistanceMetric = metrics[metric](height, width)
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      // Set initial values for distance metric output and cell id
      distanceMetric = initialDistanceMetric
      cellId = -1
      // Iterate points
      for (let pointId = 0; pointId < points.length; pointId++) {
        distance = metrics[metric](points[pointId].x - x, points[pointId].y - y)
        // Current point found in points list, remember it
        if (distance < distanceMetric) {
          distanceMetric = distance
          cellId = pointId
        }
      }
      ctx.fillStyle = C[cellId];
      ctx.fillRect(x, y, 1, 1);
    } //fend x
  } //fend y
}

export { getAreas, drawVoronoi, drawCenters }
