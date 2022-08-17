//	This module contains the code to build and manipulate the "control panel".  The control panel is the collection
//	of elements that allow a designer to initialize a puzzle: set size, number of trees, etc.
//
//	Code that deals specifically with the puzzle and shape configuration is in puzzle.js.

function buildControlPanel ()
{	//	The control panel contains those elements a designer will use to configure the puzzle. 

	const panel = createDOMElement ("section",
	{
		"class": "panel control-panel",
		"id":	 "control-panel"
	});

	panel.append (addSizeInput());
	panel.append (addNumberTreesSelectors());

	return panel;
}

let puzzleSize = 10;

function addSizeInput ()
{	//	Puzzles are a grid composed of an equal number of rows and columns (a square).  The parameter 'size' is the
	//	number of cells in each row and column.

	const div = createDOMElement ("div", { })

	const span = createDOMElement ("span", { "innerText": "Set number of rows / column:" }, div);
	const select = createDOMElement ("select", { }, div);
	for (let i=8; i<17; i++)
	{
		const option = createDOMElement ("option", { "innerText": i }, select);
		if (i == puzzleSize) option.selected = true;
	}

	select.addEventListener ("change", event =>
	{	event.preventDefault();

		//	The size of the puzzle space has been changed...set the global size variable to the new value and
		//	re-initialize the puzzle zone.

		//	How do you find the value that has been selected?  For now just make it 14...
		puzzleSize = 14;

		const panel = document.getElementById ("puzzle-panel");
		removePuzzleZone (panel);
		panel.append (buildPuzzleZone (14));
	})

	return div;
}

let treeCount = undefined;

function addNumberTreesSelectors ()
{	//	A trees puzzle may have one to three 'trees' in each row, column and shape.  That number must be the same
	//	for all rows, all columns and all shapes in the puzzle, but is independent of the size of the puzzle.  A
	//	puzzle with 10 rows and columns could have one tree per row, or two trees per row.
	//
	//	There is probably some validation that could go here...can a 8 x 8 puzzle support two or three 'trees' per
	//	row?  What's the minimum and maximum sizes that can be made for a one, two or three tree puzzle.  I don't
	//	know the answer to that, so there is no validation for now.  If a valid puzzle configuration cannot be
	//	achieved with the size and tree count specified, Validator will catch it -- but a little up front
	//	intelligence could save time and effort.

	//	The tree count is achieved by clicking on buttons: one-tree, two-tree and three-tree.  Clicking on any
	//	buttone once will set the number of trees as coorespond to the button, even if the number of trees
	//	has already been selected.  Clicking the same button a second time will reset the tree count to undefined.

	const div = createDOMElement ("div", { })

	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "one-tree",
		"innerText":  "ONE TREE",
		"tree-count": 1
	}, div);


	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "two-trees",
		"innerText":  "TWO TREES",
		"tree-count": 2
	}, div);

	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "three-trees",
		"innerText":  "THREE TREES",
		"tree-count": 3
	}, div);

//	And this is where I put the event handler -- maybe.  There are not a lot of configuration options, so having
//	many event handlers may not be a issue.  Separate event handlers for each button or configuration option
//	will simplify the code quite a bit and make it easier to read.

	return div;
}
