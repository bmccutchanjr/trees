window.addEventListener ("load", event =>
{	event.preventDefault();

	//	The page is hidden by default to improve the appearance of the <noscript> tag.  Obviously I want to undo that
	//	immediately if JavaScript is allowed by the browser...and if this script is running, it is.

	document.getElementById ("sticky-wrapper").classList.remove ("hide");
	document.getElementsByTagName ("footer")[0].classList.remove ("hide");

})