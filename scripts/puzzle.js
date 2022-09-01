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
			const td = createDOMElement ("td",
			{
//					"class":	"puzzle-cell",
				"class":	"puzzle-cell shape-unassigned",
				"column":	j,
				"row":		i
			}, row)

			createDOMElement ("button",
			{
				"class":	"cell-button shape-unassigned",
				"column":	j,
				"row":		i
			}, td)
		}
	}

	return table;
}

function removePuzzleZone (panel)
{	//	Remove the current puzzle zone from the DOM...presumably because the size of the puzzle has been changed.

	while (panel.firstChild)
	{
		panel.removeChild (panel.firstChild);
	}
}

let currentSelectedShape = 5;

function addPuzzleEventHandler (puzzle)
{	//	Add the event handler(s) to the puzzle.  For now, there is only a need to handle click events on the
	//	individual cells.

	puzzle.addEventListener ("click", event =>
	{	event.preventDefault();

		target = event.target;
		if (!target.classList.contains ("cell-button")) return;

		//	I have to know which shape is being manipulated...that's a property of the selected-shape element of
		//	the shape selector.

		const shape = document.getElementById ("selected-shape");
		let number = shape.getAttribute ("number");

		const classToAssign = "background-" + number;

		const parent = target.parentElement;
		if (parent.classList.contains ("shape-unassigned"))
		{	//	If the target cell is unassigned, assign it to this currently selected shape.  It is the cell that is
			//	assigned to a shape, not the button.  The cell is the parent element of the button.

			parent.classList.remove ("shape-unassigned");
			parent.classList.add (classToAssign);

			target.classList.remove ("shape-unassigned");
		}
		else if (parent.classList.contains (classToAssign))
		{	//	If the target cell is already assigned to the currently selected shape, unassign it.  Remember the
			//	shape is assigned to the cell which is the parent of the target button

			parent.classList.add ("shape-unassigned");
			parent.classList.remove (classToAssign);

			//	Also add the shape-invalid class to the button to effectively "gray out" the cell

			target.classList.remove ("shape-invalid");
			target.classList.add ("shape-unassigned");
		}
		else
		{	//	If the cell is assigned to some shape other than the currently selected shape (those conditions
			//	are handled above), assign it the currenly selected shape...do nothing to the button

			const list = parent.classList;
			list.forEach (l =>
			{	//	The cell was assigned to a shape...but which one?  Find it and remove it

				if (l.indexOf ("background") == 0) parent.classList.remove (l)
			})

			parent.classList.add (classToAssign);
		}

		isThisShapeValid (number);
	})
}

function assignShape (cell)
{	//	Assigns the cell that is the target of the click event to one of the "shapes" in the puzzle.  There are an
	//	equal number of shapes as rows and columns in the puzzle.  Cells in a shape are identified by the color of
	//	shape and color is, in turn, determined by the class: background-XX, where XX is the shape number.

	cell.classList.add ("background-11");
}

//	function isThisShapeValid ()
function isThisShapeValid (shapeNumber)
{	//	This function will attempt to determine whether a shape is valid or not.  To be valid, a shape must contain
	//	a number of 2x2 clusters equal to or greater than the number of trees in the puzzle (1, 2 or 3).
	//
	//	Clusters are 2x2 groupings of cells such that the cells are mutually exclusive.  A tree placed in any of
	//	these cells will exclude the possibility that a tree may be placed in any of the others.  Clusters cannot
	//	overlap and cells can not be shared by multiple clusters.

//	But for the moment, let's just say a shape has to have 4 cells...
const puzzle = document.getElementById ("puzzle-panel");
const cells = puzzle.getElementsByClassName ("background-" + shapeNumber);
if (cells.length > 4)
{
	for (let i=0; i<cells.length; i++)
	{
		cells[i].firstChild.classList.remove ("shape-invalid");
	}
}
else
{	//	Cells can be removed from the shapes they were assigned to.  If enough cells are removed, the shape can
	//	become invalid again.

	for (let i=0; i<cells.length; i++)
	{
		cells[i].firstChild.classList.add ("shape-invalid");
	}
}

}