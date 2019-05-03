// Iterates a list as pairs
function pairwise(arr, func) {
    for(var i=0; i < arr.length - 1; i++){
        func(arr[i], arr[i + 1])
    }
}

// Checks if Number object is even
function isEven(n) {
   return n % 2 == 0
}

// Cuts the last character of a string if string's length is odd.
function cutLastCharIfOdd(str) {
  return this.isEven(str.length) ? str : str.substring(0, str.length - 1)
}

// Multiplies a float value in a given range
function multiplyInRange(min, max, multiplier) {
    return min + multiplier * (max + 1 - min)
}

export { pairwise, isEven, cutLastCharIfOdd, multiplyInRange }
