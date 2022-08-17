window.addEventListener ("load", event =>
{	event.preventDefault();

	//	The page is hidden by default to improve the appearance of the <noscript> tag.  Obviously I want to undo that
	//	immediately if JavaScript is allowed by the browser...and if this script is running, it is.

	document.getElementById ("sticky-wrapper").classList.remove ("hide");
	document.getElementsByTagName ("footer")[0].classList.remove ("hide");

	const puzzle = buildPuzzleZone (10);

	puzzle.addEventListener ("click", event =>
	{	event.preventDefault();
		target = event.target;
alert ("clicked...");
		if (target.classList.contains ("puzzle-cell")) assignShape (target);
	})
})

function buildPuzzleZone (size)
{	//	Create an HTML <table> element and populate it with a number of empty cells.  These cells are potential
	//	targets of a click event...

	const main = document.getElementsByTagName ("main")[0];
	//	The puzzle is a grid composed of an equal number of rows and columns (a square).  The parameter 'size' is the
	//	number of cells in each row and column.

	const table = createDOMElement ("table", { }, main);

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

function assignShape (cell)
{	//	Assigns the cell that is the target of the click event to one of the "shapes" in the puzzle.  There are an
	//	equal number of shapes as rows and columns in the puzzle.  Cells in a shape are identified by the color of
	//	shape and color is, in turn, determined by the class: background-XX, where XX is the shape number.

	cell.classList.add ("background-11");
}