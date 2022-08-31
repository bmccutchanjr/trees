//	This module contains the code to build and manipulate the "configuration panel".  The config panel is the
//	collection of elements that allow a designer to initialize a puzzle: set size, number of trees, etc.
//
//	Code that deals specifically with the puzzle and shape configuration is in puzzle.js.

function buildConfigPanel ()
{	//	The config panel contains those elements a designer will use to configure the puzzle. 

	const panel = createDOMElement ("section",
	{
		"class": "panel config-panel",
		"id":	 "config-panel"
	});

	panel.append (addNumberTreesSelectors());
	panel.append (addSizeInput());
	panel.append (addShapeSelector());
	const wrapper = createDOMElement ("section", { }, panel);
	wrapper.append (addResetButton ());
	wrapper.append (addValidatorButton ());
	wrapper.append (addSolverButton ());

	return panel;
}

let puzzleSize = 10;

function addSizeInput (minSize = 10, selected = 10)
{	//	Puzzles are a grid composed of an equal number of rows and columns (a square).  The parameter 'size' is the
	//	number of cells in each row and column.

	const div = createDOMElement ("div", { })

	const select = createDOMElement ("select",
	{
		"class":	"size-selector"
	}, div);

	for (let i=minSize; i<17; i++)
	{
		const option = createDOMElement ("option",
		{
			"innerText": i,
			"value":	 i
		}, select);
		if (i == selected) option.selected = true;
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

	const selectors = createDOMElement ("section", { "class": "tree-selectors" } )

	let div = createDOMElement ("div", { "class": "wrapper" }, selectors);
	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "single-tree",
		"innerText":  "SINGLE TREE",
		"min-size":	  8,
		"default":	  8,
		"title":	  "Click here to make this a 'single tree' puzzle",
		"tree-count": 1
	}, div);

	div = createDOMElement ("div", { "class": "wrapper" }, selectors);
	createDOMElement ("button",
	{
		"class":	  "number-selector selected",
		"id":		  "double-trees",
		"innerText":  "DOUBLE TREE",
		"min-size":	  10,
		"default":	  10,
		"title":	  "This puzzle is a 'double tree' puzzle.  Click here to reset.",
		"tree-count": 2
	}, div);

	div = createDOMElement ("div", { "class": "wrapper" }, selectors);
	createDOMElement ("button",
	{
		"class":	  "number-selector",
		"id":		  "triple-trees",
		"innerText":  "TRIPLE TREE",
		"min-size":	  12,
		"default":	  14,
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

function addShapeSelector ()
{	//	Add elements to allow the designer to assign cells in the puzzle zone to specific shapes.

	const wrapper = createDOMElement ("section",
	{
		"class":	"wrapper",
	})

	const div = createDOMElement ("div", { "class":	"shape-wrapper" }, wrapper);

	createDOMElement ("button",
	{
		"class":	"small-button",
		"id":		"previous-shape",
		"innerText":	"<",
		"title":	"Select the previous shape.  The selector will wrap around to the end."
	}, div)

	createDOMElement ("div",
	{
		"class":	"shape-span background-1",
		"id":		"selected-shape",
		"innerText":	shapeSelectorText (1),
		"number":	1,
		"title":	"Any changes will be applied to this shape."
	}, div)

	createDOMElement ("button",
	{
		"class":	"small-button",
		"id":		"next-shape",
		"innerText":	">",
		"title":	"Select the next shape.  The selector will wrap around to the beginning."
	}, div)

	createDOMElement ("div",
	{
		"innerText":	"Click on any cell in the puzzle space to add it to the currently selected shape."
	}, wrapper)

	wrapper.addEventListener ("click", event => { handleShapeSelector (event) });

	return wrapper;
}

function handleShapeSelector (event)
{	event.preventDefault();
	target = event.target;

	//	Click event handler for buttons in "shape selector".

	//	As with other click event handlers, I am only interested in click events on the buttons.  Ignore
	//	everything else.

	if (target.tagName != "BUTTON") return;

	//	Now get on with it...

	const shape = document.getElementById ("selected-shape");
	let number = shape.getAttribute ("number");
	shape.classList.remove ("background-" + number);

	if (target.getAttribute ("id") == "previous-shape")
	{
		--number;
		if (number == -1) number = puzzleSize - 1;
	}
	else
	{
		++number;
		if (number == puzzleSize) number = 0;
	}

	shape.classList.add ("background-" + number);
	shape.innerText = shapeSelectorText (number);
	shape.setAttribute ("number", number);
}

function shapeSelectorText (number)
{	return "SHAPE " + number;
}

function addResetButton ()
{	//	Add a 'reset' button.

	const div = document.createElement ("div");
	const reset = createDOMElement ("button",
	{
		"id":	"reset-button",
		"innerText":	"RESET THE PUZZLE	",
		"title":	"Reset the puzzle configuration.  All of your changes will be lost."
	}, div)

	reset.addEventListener ("click", event =>
	{	event.preventDefault();

		//	Reset the page by forcing it to reload...it seems the easiest way to do it...and it's okay to reload
		//	from cache

		window.location.reload();
	})

	return div;	
}

function addValidatorButton ()
{	//	Add a 'validator' button.

//	Add a button.  Validator should be hidden by default, and only made visible if all of the required configuration
//	(including all cells added to a shape) is complete.
	const div = document.createElement ("div");
	createDOMElement ("button",
	{
		"class":	"hide",
		"id":		"validator-button",
		"innerText":	"VALIDATE THE PUZZLE",
		"title":	"Verify the puzzle has a solution (hopefully one)"
	}, div)

//	Add the click event handler

	return div;	
}

function addSolverButton ()
{	//	Add a 'solver' button.

//	Add a button.  Solver should be hidden by default, and only made visible if all of the required configuration
//	(including all cells added to a shape) is complete.
	const div = document.createElement ("div");
	createDOMElement ("button",
	{
		"class":	"hide",
		"id":		"solver-button",
		"innerText":	"SoOLVE THE PUZZLE",
		"title":	"Solve the puzzle...verifies no guess work is required"
	}, div)

//	Add the click event handler

	return div;	
}
