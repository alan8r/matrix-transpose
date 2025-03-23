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
