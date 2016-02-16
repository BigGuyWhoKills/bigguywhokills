 /*
File Prologue
Name: Adam Howell
Project: CS 2550 Project
Date: 2015-07-21
Description: This project will (eventually) be a fully functional expense tracker and budget tool.

I declare that the following source code was written by me, or is common knowledge, or was taken from the public domain.
*/


	'use strict';
//var jsonText = '{"users":[{"userName":"Harpo","password":"swordfish" },{"userName":"Groucho","password":"horsefeathers" },{"userName":"Bilbo","password":"baggins" },{"userName":"Sam","password":"gamgee" },,{"userName":"Luke","password":"usetheforce" },]}';


// Function name:	eventHandlers()
// Purpose:		This function will create all event handlers for the HTML page.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function eventHandlers()
{
	// Confirm that document.getElementById() can be used:
/*	if( document && document.getElementById )
	{
		var loginForm = document.getElementById( 'logIn' );
		loginForm.onsubmit = validateUser;
	}
*/
	//document.getElementById( 'logIn' ).onclick=validateUser();
} // End of eventHandlers() function.


// Function name:	validateUser()
// Purpose:		This function will attempt to validate the user against an AJAX server located at http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function validateUser()
{
	//alert( 'validateUser()' );
	
	// Sample URL: userName=Harpo&password=swordfish
	// The server will respond with a JSON object (in string form) that has three elements: result, userName, and timestamp.
	// The result will be the string 'valid' or the string 'invalid'.  If result is 'invalid', the other two elements will be undefined.
	// If result is 'valid', userName will be the login name and timestamp will be a string with a date and time.
	// Valid passwords can be found here: http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/list.php

	// Get references to the form elements:
	var ajaxUser = document.getElementById( 'usernameInput' ).value;
	var ajaxPass = document.getElementById( 'userPassInput' ).value;
	//alert( 'Attempting userName: ' + ajaxUser + '\nAttempting password: ' + ajaxPass );

	var ajaxObject = getXMLHttpRequestObject();
	//ajaxObject.onreadystatechange = handleStateChange()
	ajaxObject.onreadystatechange = function()
	{
		if( ajaxObject.readyState == 4 )
		{
			//alert( 'Ajax is now ready.\nAjax readyState: ' + ajaxObject.readyState );
			// Check the HTTP status code.  Coes from 200 to 299, indicate no error.  Code 304 indicates the document is in cache.
			if( ( ajaxObject.status >= 200 && ajaxObject.status < 300 ) || ( ajaxObject.status == 304 ) )
			{
				if( ajaxObject.responseText == 'valid' )
				{
					alert( 'You are now logged in!' );
				}
				else if( ajaxObject.responseText == 'invalid' )
				{
					alert( 'The userName and/or password is invalid' );
				}
			}
			else
			{
				//alert( 'Ajax status text: ' + ajaxObject.statusText );
				document.getElementById( 'theForm' ).submit();
			}
		}
		else
		{
			//alert( 'Not yet ready.\nAjax readyState: ' + ajaxObject.readyState );
		}
	}
	//ajaxObject.open( 'GET', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', true );
	ajaxObject.open( 'POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', false );
	ajaxObject.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
	//var data = 'email=' + encodeURIComponent( email.value ) + '&password=' + encodeURIComponent( password.value );
	//alert( 'Sending userName: ' + ajaxUser + '\nSending password: ' + ajaxPass );
	var data = 'userName=' + ajaxUser + '&password=' + ajaxPass;
	ajaxObject.send( data );
	
	// Setting the ajaxObject.open to asynchronous causes this JSON.parse to fail due to a premature termination.  This alert helps track that down.
	//alert( ajaxObject.responseText );
	var parsedAjax = JSON.parse( ajaxObject.responseText );
	if( parsedAjax.result == 'invalid' )
	{
		//alert( 'Login failed!' );
		document.getElementById( 'usernameDebug' ).innerHTML = 'Login failed!';
	}
	else if( parsedAjax.result == 'valid' )
	{
		// Update the debugDiv to show that the login was successful.
		document.getElementById( 'usernameDebug' ).innerHTML = 'Login succeeded!';

		// Create strings for localStorage.
		//alert( parsedAjax.userName );
		var userName = 'userName';
		var loginString = parsedAjax.userName;
		//alert( parsedAjax.timestamp );
		var timeStampName = 'cs2550timestamp';
		var sessionTimeStamp = parsedAjax.timestamp;

		if( typeof( Storage ) !== 'undefined' )
		{
			// Save those strings in localStorage.
			localStorage.userName = ajaxUser;
			localStorage.cs2550timestamp = parsedAjax.timestamp;
			// Test to see if localStorage worked.
			//alert( 'Stored timeStamp: ' + localStorage.cs2550timestamp );
	
			// Notify the user that they have successfully logged in.
			//alert( 'Login successful! Redirecting to the expense tracker.' );
			// Move to the expense tracker.
			document.location = 'expenses.html';
		}
		else
		{
			alert( 'Local storage is not available. Please upgrade your browser.' );
			document.location = 'expenses.html';
		}
	}
	else
	{
		alert( 'Unable to process login information!\nAjax result: ' + parsedAjax.result );
	}
} // End of validateUser() function.


window.onload = eventHandlers;
