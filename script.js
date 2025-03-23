/*
    I was thinking about making a Tetris clone, and what would be required if the tetrominoes were stored as 2d arrays.
    I refer by name to the 2D arrays as matrices for the sake of my brain and the little bit I remember about linear algebra
    and transformations, although the more interesting part of this exercise, for me anyway, is the break-even point of
    whether it is worth actually coding a function for 90 degree rotations of matrices, or if it truly is easier
    to just hard-code each "state" of each rotated block. The following are my thoughts and justifications for choosing the
    route that I did --
    
    There are 7 tetrominoes in Tetris (not including rotations):
    L:              J:              s:              z:              T:
        0                0 
        0                0               00             00               0 
        00              00              00               00             000

    line:           square:
                        00
        0000            00


    Given these 7 pieces only L, J and T actually have more than two rotations states, since line, s and z effectively
    return to their original configuration after 2 90degree rotations, and square not changing at all when rotated

    With the 
        4 possible states of each L, J, T, 
        2 states for s, z, line, 
        1 state of square,
    this leaves only 19 total states needing to be accounted for, so for this specific traditional set of tetrominoes there is
    an argument to me made that it is potentially easier to just hard-code each state and handle rotation via flipping between 
    those hard-coded values to represent each rotation. That being said, the below code performs actual "90 degree" 
    rotation for 2D arrays in JavaScript, achieved via matrix transposes and then reversing each submatrices (or vice versa for
    opposite rotation). This enables arbitrary shapes to be added to a game without the need to manually account for and 
    hardcode each rotation state of a given shape. I personally find this the most flexible option that strikes a decent 
    balance between not being overly difficult to implement while still being flexible, and also not being computationally 
    intensive, e.g. implementing or using external library functions for matrix transformations or other equally mathematically 
    complex and (in my mind) unnecessary computationally intensive code
*/

// function for printing 2d arrays ("arrays of arrays") more easily than default Array.toString
function matrixToString(matrix, dims=false) {
    let stringMatrix = "";
    for (let i = 0; i < matrix.length; i++) {
        stringMatrix += `[${matrix[i].toString()}]${i==matrix.length-1?'':',\n'}`
    }
    if(dims) stringMatrix += `\n${matrix[0].length} by ${matrix.length}`;
    return stringMatrix;
}

// transpose an array
function transpose2d(matrix) {
    let mWidth = matrix[0].length,
        mHeight = matrix.length
    let returnMatrix = Array.from(Array(mWidth), ()=>new Array(mHeight))
    for (y in matrix) {
        for (x in matrix[y]) {
            returnMatrix[x][y] = matrix[y][x]
        }
    }
    return returnMatrix
}

//rotate a matrix 90 degrees "left" (counterclockwise)
function rotateMatrixLeft(matrix) {
    // 1) reverse submatrices, 2) transpose
    let returnMatrix = matrix.map(arr=>arr.slice())
    for (row of returnMatrix) row.reverse()
    returnMatrix = transpose2d(returnMatrix)
    return returnMatrix
}

//rotate a matrix 90 degrees "right" (clockwise)
function rotateMatrixRight(matrix) {
    // 1) transpose, 2) revese submatrices
    let returnMatrix = matrix.map(arr=>arr.slice())
    returnMatrix = transpose2d(returnMatrix)
    for (row of returnMatrix) row.reverse()
    return returnMatrix
}

/*
    entry point below and test code below
*/

let testMatrix = [
    [1,2,3,4],
    [5,6,7,8]
]

// let testMatrix = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ]

let tposeMatrix = transpose2d(testMatrix);
let matrixRotLeft = rotateMatrixLeft(testMatrix);
let matrixRotRight = rotateMatrixRight(testMatrix);

let testMatrix2 = [
    ["0","0","0"],
    [" "," ","0"],
]

console.log(matrixToString(testMatrix2))


// perform an action "numRotations" number of times, necessary because JavaScript doesn't have a range function
// for use in for loops, and reimplementing range is out of the scope of this little test

let numRotations = 4;
let count = 0;

Array.from({length:numRotations}, ()=>{
    testMatrix2 = rotateMatrixRight(testMatrix2)
    console.log((++count)+"\n"+matrixToString(testMatrix2))
})
