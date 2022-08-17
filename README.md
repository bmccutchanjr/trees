Trees
=====

Trees is a utility inspired by "trees" logic puzzles.  The goal of a trees puzzle it to place 'trees' in the correct location with no hints other than the visual configuration of the puzzle.

This application is intended to assist puzzle creators verify that their puzzles can be solved with logic alone (no guessing or trial-and-error assumptions required) and that there is one and only one solution to the puzzle.  The application does this by solving the puzzle with two distict methodologies: validator and solver.  Both are accessed from the same page.

Trees is an interactive tool intended to help designers puzzle by puzzle and is not intended as a platform for potential solvers.  It isn't set up to allow designers to share their creations.  Puzzles are not saved.

Trees uses HTML, CSS and JavaScript.

For specific information on how to use the tool, see USEME.md.

Validator
---------

Validator employs a recursive brute force approach, assigning trees beginning with an arbitrary location.  The next tree is assigned to the next legal position and the process is repeated until the puzzle is solved or the current branch becomes invalid.

Because every permutation of tree arrangements is explored Validator will tell the puzzle designer if the puzzle has a solution and how many (hopefully just one) there are.

Solver
------

Solver attempts to analyze the puzzle the same way a player might employing a few simple logic rules repetitively.  If successful, Solver will have demonstrated that the puzzle can be solved without guessing or trial and error.