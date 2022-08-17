window.addEventListener ("load", event =>
{	event.preventDefault();

	//	The page is hidden by default to improve the appearance of the <noscript> tag.  Obviously I want to undo that
	//	immediately if JavaScript is allowed by the browser...and if this script is running, it is.

	document.getElementById ("sticky-wrapper").classList.remove ("hide");
	document.getElementsByTagName ("footer")[0].classList.remove ("hide");

	buildPage();
})

function buildPage ()
{	//	This is where is starts.  Create a puzzle zone and add it to the DOM.  Add elements to the DOM to allow the
	//	designer to interact with and configure the puzzle. 

	const main = document.getElementsByTagName ("main")[0];
	main.append (buildControlPanel());
	main.append (buildPuzzlePanel (10));
//	02		createDOMElement ("section",
//	02		{
//	02			"id":	"control-panel"
//	02		}, main);
//	02	
//	02		createDOMElement ("section",
//	02		{
//	02			"id":	"puzzle-panel"
//	02		}, main)
}

function buildControlPanel ()
{	//	The control panel contains those elements a designer will use to configure the puzzle. 

	const panel = createDOMElement ("section",
	{
		"class": "panel control-panel",
		"id":	 "control-panel"
	});

	return panel;
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
