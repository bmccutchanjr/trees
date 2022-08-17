//	This module contains code specifically associated with the puzzle

const shapes = [];
const activeShape = [];

function buildPuzzleZone (size)
{	//	Create an HTML <table> element and populate it with a number of empty cells.  These cells are potential
	//	targets of a click event...

	//	The puzzle is a grid composed of an equal number of rows and columns (a square).  The parameter 'size' is the
	//	number of cells in each row and column.

	const table = createDOMElement ("table", { });
	addPuzzleEventHandler (table);

	for (let i=0; i<size; i++)
	{
		const row = createDOMElement ("tr", { }, table);
		for (let j=0; j<size; j++)
		{
			createDOMElement ("td",
			{
				"class":	"puzzle-cell",
				"column":	j,
				"row":		i
			}, row)
		}
	}

	return table;
}

function addPuzzleEventHandler (puzzle)
{	//	Add the event handler(s) to the puzzle.  For now, there is only a need to handle click events on the
	//	individual cells.

	puzzle.addEventListener ("click", event =>
	{	event.preventDefault();
		target = event.target;

		if (target.classList.contains ("puzzle-cell")) assignShape (target);
	})
}

function assignShape (cell)
{	//	Assigns the cell that is the target of the click event to one of the "shapes" in the puzzle.  There are an
	//	equal number of shapes as rows and columns in the puzzle.  Cells in a shape are identified by the color of
	//	shape and color is, in turn, determined by the class: background-XX, where XX is the shape number.

	cell.classList.add ("background-11");
}