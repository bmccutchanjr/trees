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

	const select = createDOMElement ("select",
	{
		"class":	"size-selector"
	}, div);

	for (let i=8; i<17; i++)
	{
		const option = createDOMElement ("option",
		{
			"innerText": i,
			"value":	 i
		}, select);
		if (i == puzzleSize) option.selected = true;
	}

	createDOMElement ("span", { "innerText": "Set the number of rows and columns" }, div);

	select.addEventListener ("change", event =>
	{	event.preventDefault();
		target = event.target;

		//	The size of the puzzle space has been changed...set the global size variable to the new value and
		//	re-initialize the puzzle zone.

		const panel = document.getElementById ("puzzle-panel");
		removePuzzleZone (panel);

		puzzleSize = target.value;
		panel.append (buildPuzzleZone (puzzleSize));
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

	const selectors = createDOMElement ("div", { "class": "tree-selectors" } )

	let div = createDOMElement ("div", { }, selectors);
	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "single-tree",
		"innerText":  "SINGLE TREE",
		"title":	  "Click here to make this a 'single tree' puzzle",
		"tree-count": 1
	}, div);

	div = createDOMElement ("div", { }, selectors);
	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "double-trees",
		"innerText":  "DOUBLE TREE",
		"title":	  "Click here to make this a 'double tree' puzzle",
		"tree-count": 2
	}, div);

	div = createDOMElement ("div", { }, selectors);
	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "triple-trees",
		"innerText":  "TRIPLE TREE",
		"title":	  "Click here to make this a 'triple tree' puzzle",
		"tree-count": 3
	}, div);

	selectors.addEventListener ("click", event => { numberSelectorClickEvent (event) } );

	return selectors;
}

function numberSelectorClickEvent (event)
{	//	Making the event handler for this event an anonymous in-line function makes for lengthy, and perhaps less
	//	readable code.  So the event handler is a function call -- this function.

	event.preventDefault();
	target = event.target;

	//	Click event listeners for the number-selector buttons.  I'm only interested in the number-selector buttons, so
	//	ignore anything else.

	if (target.tagName != "BUTTON") return;

	//	And then get to the real work...

	if (target.classList.contains ("selected"))
	{	//	This is a button that was already clicked.  Clicking the same button twice should reset the number
		//	of trees to the default value of undefined

		treeCount = undefined;
		resetNumberSelectorButton (target);
	}
	else
	{	//	This event represents a button other than the currently selected button.  This button should now become
		//	the selected button and all other buttons should now be de-selected.  Set the global variable treeCouunt
		//	to coorespond with this button.

		//	'reset' all of the selector buttons -- even the target of this event.  Hey, it doesn't hurt...

		const parent = target.parentElement.parentElement;
		const children = parent.getElementsByTagName ("button");
		for (let i=0; i<children.length; i++) resetNumberSelectorButton (children[i]);

		target.classList.add ("selected");
		target.setAttribute ("title", "This puzzle is a '" + target.innerText.toLowerCase() + "' puzzle.  Click here to reset.");

		treeCount = target.getAttribute ("tree-count");
	}
}

function resetNumberSelectorButton (button)
{	//	Reset the number-selector buttons...

	button.classList.remove ("selected");
	button.setAttribute ("title", "Click here to make this a '" + button.innerText.toLowerCase() + "' puzzle");
}