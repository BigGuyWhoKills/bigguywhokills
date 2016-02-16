 /*
File Prologue
Name: Adam Howell
Project: CS 2550 Project
Date: 2015-07-21
Description: This project will (eventually) be a fully functional expense tracker and budget tool.

I declare that the following source code was written by me, or is common knowledge, or was taken from the public domain.
*/

	// Set up the global variables.
	var moveDist = 0;
	var timePerFrame = 0;
	var imageTopEdge = 0;
	var originalText = document.getElementById( 'debugDiv' ).innerHTML;
	var animInterv = 0;

	// Set the display to show the initial value of zero.
	document.getElementById( 'debugDiv' ).innerHTML = originalText + imageTopEdge;


// Function name:	animateMoney()
// Purpose:		This function will move an image down the screen.
// Parameters:		none
// Returns:		none
// Preconditions:	Several global variable must exist: dollarImg, moveDist, timePerFrame, originalText.
// Postconditions:	The image with ID 'dollars' will move until stopAnimation() is executed.
// To do:			Currently, if animateMoney() is run when already running, the speed is increased, and the stop function will no longer work.
function animateMoney()
{
	dollarImg = document.getElementById( 'dollars' ).style;				// This will be the image moved down the screen.
	var currentHeight = ( window.innerHeight - 100 );					// I don't want the image to scroll completely off the screen.
	moveDist = parseInt( document.getElementById( 'formDist' ).value );	// The distance value entered by the user in the Animation Parameters section of the HTML page.
	timePerFrame = parseInt( document.getElementById( 'formTime' ).value );	// The interval value entered by the user in the Animation Parameters section of the HTML page.
	//originalText = document.getElementById( 'debugDiv' ).innerHTML;		// Get the text that is currently in this div.

	//alert( moveDist + ' pixels every ' + timePerFrame + ' ms ' );
	//alert( imageTopEdge + ' ' + currentHeight );

	// This will fill the debugDiv with the current time.
	//setInterval(function(){ myTimer(moveDist) }, timePerFrame );

	// This will execute the moveDown funtion periodically, and move the image.style passed as a parameter.
	if( animInterv )
	{
		alert ( 'The image is already animated!' );
	}
	else
	{
		animInterv = setInterval(function(){ moveDown( dollarImg ) }, timePerFrame );
	}
} // End of animateMoney() function.


// Function name:	moveDown()
// Purpose:		This function will change the top value for an image.
// Parameters:		A variable representing image.style to move.
// Returns:		none
// Preconditions:	Two global variables need to exist: imageTopEdge, moveDist.
// Postconditions:	The image passed to this function will be moved down by moveDist.
function moveDown( _image )
{
	// Increment imageTopEdge (the top edge value) by moveDist (the increment value).
	imageTopEdge += moveDist;

	// Test code.
	//alert( imageTopEdge );

	// Set the top edge position of the image to the new value.
	_image.top = imageTopEdge + 'px';

	// Update debugDiv with the current image location.
	document.getElementById( 'debugDiv' ).innerHTML = originalText + imageTopEdge;
} // End of moveDown() function.


// Function name:	myTimer()
// Purpose:		This function display a clock in 'debugDiv'.
// Parameters:		None required.  An optional parameter can be passed for testing purposes.
// Returns:		none
// Preconditions:	A 'debugDiv' must exist.
// Postconditions:	The content of 'debugDiv' will be changed.
function myTimer( _num )
{
	var d = new Date();
	var t = d.toLocaleTimeString();

	// Assign set debugDiv to the value in 't'.
	document.getElementById( 'debugDiv' ).innerHTML = t;
} // End of myTimer() function.


// Function name:	stopAnimation()
// Purpose:		This function will halt a setInterval.
// Parameters:		The ID value of an active setInterval.
// Returns:		none
// Preconditions:	An active setInterval must exist.
// Postconditions:	The setInterval for the passed ID will be stopped.
function stopAnimation( _animation )
{
	//clearInterval( _animation );
	clearInterval( animInterv );
	animInterv = 0;
} // End of stopAnimation() function.


// Function name:	resetAnimation()
// Purpose:		This function will reset the animation image to the top of the screen.
// Parameters:		none
// Returns:		none
// Preconditions:	The global variable imageTopEdge must exist.
// Postconditions:	The 
function resetAnimation()
{
	imageTopEdge = 0;
	document.getElementById( 'dollars' ).style.top = imageTopEdge;
	document.getElementById( 'debugDiv' ).innerHTML = originalText + imageTopEdge;
} // End of resetAnimation() function.


//window.onload = buildTable;
