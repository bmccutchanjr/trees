Trees
=====

Trees is a utility inspired by "trees" logic puzzles.  It's intended to allow puzzle creators verify their puzzles can be solved with logic alone (no guessing or trial-and-error assumptions required) and that there is one and only one solution to the puzzle.

The goal of the puzzle it to place 'trees' in the correct location with no hints other than the visual configuration of the puzzle.

It does this by solving the puzzle.  There are two modes, validator and solver.  Both used from a single front-end.

Trees is an interactive tool intended to help designers puzzle by puzzle.  It is not intended to allow players access, or allow designers to save and share their creations.  Puzzles are not saved.

Trees uses HTML, CSS and JavaScript.

Validator
---------

Validator employs a recursive brute force approach, assigning trees beginning with an arbitrary location.  The next tree is assigned to the next legal position and the process is repeated until the puzzle is solved or the current branch becomes invalid.  The configuration of the puzzle is ignored in the placement of trees.

Because every permutation of tree arrangements is explored Validator will tell the puzzle designer if the puzzle has a solution and how many (hopefully just one) there are.

Solver
------

Solver attempts to analyze the puzzle the same way a player might employing a few simple logic rules repetitively.  If successful, Solver will have demonstrated that the puzzle can be solved without guessing or trial and error.