const puzzle = {};							//	The puzzle configuration and configuration variables

window.addEventListener ("load", event =>
{	event.preventDefault();

	//	The page is hidden by default to improve the appearance of the <noscript> tag.  Obviously I want to undo that
	//	immediately if JavaScript is allowed by the browser...and if this script is running, it is.

	document.getElementById ("sticky-wrapper").classList.remove ("hide");
	document.getElementsByTagName ("footer")[0].classList.remove ("hide");

	getSavedPuzzle();
	buildPage();
})

function getSavedPuzzle ()
{	//	The app allows the puzzle designer to save work-in-progress, but only one puzzle.  That puzzle is saved to
	//	localStorage.  If a puzzle has been saved, it will automatically be loaded when the page loads...and that's
	//	the only time a saved puzzle can be loaded.

	//	There is no reason to wait for the DOM...in fact, I need to insure the puzzle space has been initialized
	//	when the load event handler tries to use it.  There is very little in the HTML so the page should render
	//	quickly...but then again these are synchronous operations and JavaScript is single-threaded so coordinating
	//	initialization of the puzzle space with the DOM shouldn't be an issue.  Never-the-less, get the data
	//	AFTER the DOM has loaded.

	try
	{
		const temp = JSON.parse(getLocalStorage ("mccutchan.tree-logic-puzzle"));
		setPuzzleSize (temp.size);
		setNumberTrees (temp.numTrees);
		puzzle.space = temp.space;
	}
	catch (_)
	{	//	This is not an error...in fact it's the expected condition...no puzzle has been saved, so initialize the
		//	puzzle space

		setPuzzleSize (10);
		setNumberTrees (1);
		puzzle.space = initPuzzleSpace (10);

		return puzzle;
	}
}

function setPuzzleSize (size)
{
	puzzle.size = size;
}

function setNumberTrees (number)
{
	puzzle.numTrees = number;
}

function initPuzzleSpace (size)
{	//	Initialize the puzzle space

	const array = [];

	for (let i=0; i<size; i++)
	{
		const row = [];

		for (let j=0; j<size; j++)
		{
			row.push ( { } );
		}

		array.push (row);
	}

	return array;
}

function savePuzzle (puzzle)
{	//	Save a puzzle...any previously saved puzzle is overwritten

	setLocalStorage ("mccutchan.tree-logic-puzzle", JSON.stringify (puzzle));
}

function buildPage ()
{	//	This is where is starts.  Create a puzzle zone and add it to the DOM.  Add elements to the DOM to allow the
	//	designer to interact with and configure the puzzle. 

	const main = document.getElementsByTagName ("main")[0];
	main.append (buildConfigPanel());
	main.append (buildPuzzlePanel (10));
}

function buildPuzzlePanel ()
{	//	The puzzle panel contains the puzzle. 

	const panel = createDOMElement ("section",
	{
		"class": "panel puzzle-panel",
		"id":	 "puzzle-panel"
	})

	panel.append (buildPuzzleZone (10));

	return panel;
}
