import { sha256 } from 'js-sha256';
import { isEven, pairwise } from './util.js'

function listToMultipliers(arr, max) {
  return arr.map(function(item) {
    return item / max
  })
}

function stringToPoints(str, width, height) {
  let points = []
  let checksum = sha256.sha256.array(str)
  let multipliers = listToMultipliers(checksum, 255)
  if (!isEven()) multipliers.pop()
  pairwise(multipliers, function(current, next) {
    let x = width * current
    let y = height * next
    points.push({
      x: Math.floor(x),
      y: Math.floor(y),
      mulx: current,
      muly: next
    })
  })
  return points
}

export { listToMultipliers, stringToPoints }
