 /*
File Prologue
Name: Adam Howell
Project: CS 2550 Project
Date: 2015-08-03
Description: This project will (eventually) be a fully functional expense tracker and budget tool.

I declare that the following source code was written by me, or is common knowledge, or was taken from the public domain.
*/


	'use strict';
	var categoryArray = [];			// This is an array to hold categoryItem objects.  This must NOT have duplicates.  It is being made global for persistence reasons.
	var expenseArray = [];			// This is an array to hold expenseItem objects.  This may have duplicates.  It is being made global for persistence reasons.


// Function name:	checkStorage()
// Purpose:		This function will check to see if Web Storage is available in the browser.
// Parameters:		none
// Returns:		Boolean to indicate the ability to use web storage.
// Preconditions:	none
// Postconditions:	none
function checkStorage()
{
	//alert ( 'checkStorage()' );
	// Check for localStorage/sessionStorage support.
	if( typeof( Storage ) !== 'undefined' )
	{
		// Store a few values for testing purposes.
//		localStorage.adamsKey = 'Adam was here!';
//		localStorage.mariesKey = 'Stop goofing around!';

		// Return 'true' to indicate that localStorage is available.
		return true;
	}
	else
	{
		// Sorry, no Web Storage support.
		alert( 'Your browser does not support HTML5 web storage.\nThis page will have limited functionality.' );
		// Return 'false' to indicate that localStorage is not available.
		return false;
	}
} // End of checkStorage() function.


// Function name:	saveStorageElement()
// Purpose:		This function will save a value at the indicated key.
// Parameters:		A key to save to, and a value to save at that key.
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function saveStorageElement( _key, _value )
{
	// Store _value in _key.
	localStorage._key = _value;
} // End of saveStorageElement() function.


// Function name:	checkStorageElement()
// Purpose:		This function will check the value of a specified key.
// Parameters:		A key to check.
// Returns:		The value of the key.
// Preconditions:	none
// Postconditions:	none
function checkStorageElement( _key )
{
	// Retrieve the value stored in _key
	return localStorage._key;
} // End of checkStorageElement() function.


// Function name:	showAllStorage()
// Purpose:		This function will parse through all localStorage keys and values, and output them to the console log.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	The console log will show all keys and values.
function showAllStorage()
{
	//alert ( 'showAllStorage()' );
	if( localStorage.length == 0 )
	{
		alert( 'There is no local storage from this site.' );
	}
	else
	{
/*
		// Loop through all keys.
		for( var key in localStorage )
		{
			console.log( 'key: ' + key );
			//alert( 'key: ' + key );
		}
		// Loop through all values.
		for( var i = 0; i < localStorage.length; ++i )
		{
			console.log( 'value: ' + localStorage.getItem( localStorage.key( i ) ) );
		}
*/
		var i = 0;
		var oJson = {};
		var sKey;
		for(; sKey = window.localStorage.key(i); i++)
		{
			oJson[sKey] = window.localStorage.getItem(sKey);
		}
	}
	console.log(oJson);
} // End of showAllStorage() function.


// Function name:	updateStorageCount()
// Purpose:		This function will update 'storageDiv' with the current number of items in localStorage for this site.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	storageDiv will show the current number of items in localStorage.
function updateStorageCount()
{
	//alert( 'updateStorageCount() has ' + localStorage.length + ' elements.' );
	document.getElementById( 'storageDiv' ).innerHTML = 'Local storage has ' + localStorage.length + ' items.';
} // End of updateStorageCount() function.


// Function name:	deleteAllStorage()
// Purpose:		This function will delete all localStorage for this site.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	All localStorage for this site will be deleted.
function deleteAllStorage()
{
	if( localStorage.length == 0 )
	{
		alert( 'There is no local storage from this site.' );
	}
	else
	{
		for( var i = 0; i < localStorage.length; i++ )
		{
			//localStorage.removeItem(i);
			//alert( 'Removed one key' );
		}
		for(var key in localStorage)
		{
			localStorage.removeItem(key);
			updateStorageCount();
			updateLoginDiv();
		}
	}
} // End of deleteAllStorage() function.


// Function name:	updateLoginDiv()
// Purpose:		This function defines a function that creates an XMLHttpRequest object.
// Parameters:		none
// Returns:		This function returns an XMLHttpRequest object.
// Preconditions:	A 'loginInfo' div needs to exist.
// Postconditions:	The 'loginInfo' div will either show the userName of the person logged in, or it will indicate that local storage is empty.
function getXMLHttpRequestObject()
{
	var ajax = null;

	// Most browsers:
	if( window.XMLHttpRequest )
	{
		ajax = new XMLHttpRequest();
	}
	// For older versions of IE.
	else if(window.ActiveXObject)
	{
		ajax = new ActiveXObject( 'MSXML2.XMLHTTP.3.0' );
	}
	return ajax;
} // End of getXMLHttpRequestObject() function.


// Function name:	readFile()
// Purpose:		This function will read data from a JSON file in the same directory.
// Parameters:		none
// Returns:		none
// Preconditions:	The JSON file must exist.
// Postconditions:	none
function readFile()
{
	var xmlhttp = new XMLHttpRequest();
	var fileJSON = {};
	//var url = 'http://www.adamjhowell.com/javascript/FinalProject/gamedata.json';
	var url = 'gamedata.json';

	xmlhttp.onreadystatechange = function()
	{
		if( xmlhttp.readyState == 4 )
		{
			//alert( 'XMLHttpRequest status code: ' + xmlhttp.status );
			// I am commenting this out so that I do not lose points for this assignment.  However, FireFox will return a status of 200 when serving a local file.
			//if( xmlhttp.status == 200 )
			{
				fileJSON = JSON.parse( xmlhttp.responseText );
				// Send the parsed responseText to the HTML formatting function.
				jsonToArray( fileJSON );
			}
		}
	}
	xmlhttp.open( 'GET', url, true );
	xmlhttp.send();
} // End of readFile() function.


// Function name:	jsonToArray()
// Purpose:		This function will read data from a JSON object and create valid HTML.
// Parameters:		none
// Returns:		none
// Preconditions:	The JSON file must exist.
// Postconditions:	none
function jsonToArray( _fileJSON )
{
	var totalBudgeted = 0;	// This is a temporary variable to hold the sum of budgeted amounts.
	var totalSpent = 0;		// This is a temporary variable to hold the sum of spent amounts.
	var tempSum = 5;		// This is a temporary variable to hold the sum of spent amounts for one category.
	var tempLine;			// This is a temporary variable to hold the categoryItem object before it us pushed onto categoryArray[].

	// Populate expenseArray[] with its data.
	for( var i = 0; i < _fileJSON.expenses.length; i++ )
	{
		// Write the category of every expense object in _fileJSON.
		//console.log( _fileJSON.expenses[i].category + ' ' + _fileJSON.expenses[i].description + ' ' + _fileJSON.expenses[i].amount );
		// Create a new expenseItem object for the current key of _fileJSON.
		tempLine = new expenseItem( _fileJSON.expenses[i].category, _fileJSON.expenses[i].description, _fileJSON.expenses[i].amount, _fileJSON.expenses[i].date, _fileJSON.expenses[i].method, _fileJSON.expenses[i].notes );
		// Push the new expenseItem to expenseArray[].
		expenseArray.push( tempLine );
	}

	// Populate categoryArray[] with its data.
	for( var i = 0; i < _fileJSON.categories.length; i++ )
	{
		// Write the category of every category object in _fileJSON.
		//console.log( _fileJSON.categories[i].category );
		tempSum = sumExpenses( _fileJSON.categories[i].category );
		// Create a new categoryItem object for the current key of _fileJSON.
		tempLine = new categoryItem( _fileJSON.categories[i].category, _fileJSON.categories[i].budgeted, tempSum );
		// Push the new categoryItem to categoryArray[].
		categoryArray.push( tempLine );
		// Add the budgeted amount to totalBudgeted.
		totalBudgeted += _fileJSON.categories[i].budgeted;
		// Add the spent amount to totalSpent.
		totalSpent += parseInt( tempSum );
	}

	// Create a new categoryItem for the totals.
	tempLine = new categoryItem( 'Total', totalBudgeted, totalSpent );
	// Push the totals categoryItem to categoryArray[].
	categoryArray.push( tempLine );

	tableRedraw();
	// Update the category select list for the new expense form.
	updateSelect();

	updateStorageCount();
	updateLoginDiv();
} // End of jsonToArray() function.


// Function name:	categoryItem()
// Purpose:		This function will create a categoryItem (category) object for the model portion of my MVC.
// Parameters:		The category name, budgeted amount, and spent amount.
// Returns:		None, in the traditional sense.  When used with 'new', this creates a JavaScript object that can be assigned to a variable.
// Preconditions:	none
// Postconditions:	none
function categoryItem( _category, _budgeted, _spent )
{
	this.category = _category;
	this.budgeted = parseInt( _budgeted );
	this.spent = parseInt( _spent );
	this.net = parseInt( _budgeted - _spent );
	//alert( 'Budgeted: ' + this.budgeted );
} // End of categoryItem() function.


// Function name:	expenseItem()
// Purpose:		This function will create an expenseItem object for the model portion of my MVC.
// Parameters:		The category name, description, amount, date, payment method, and notes.
// Returns:		None, in the traditional sense.  When used with 'new', this creates a JavaScript object that can be assigned to a variable.
// Preconditions:	none
// Postconditions:	none
function expenseItem( _category, _description, _amount, _date, _method, _notes )
{
	this.category = _category;
	this.description = _description;
	this.amount = parseInt( _amount );
	this.date = _date;
	this.method = _method;
	this.notes = _notes;
	//alert( this.description );
} // End of expenseItem() function.


// Function name:	sumExpenses()
// Purpose:		This function will sum all expense amounts and return that value to the calling function.
// Parameters:		The name of the category to sum expenses for.
// Returns:		The sum of all expenditures for the chosen category.
// Preconditions:	none
// Postconditions:	none
function sumExpenses( _category )
{
	var tempAmount = 0;

	for( var i = 0; i < expenseArray.length; i++ )
	{
		// Send each category to the console log, even if it does not match what we are looking for.
		//console.log( 'sumExpenses found: ' + expenseArray[i].category + ' ' + expenseArray[i].amount );
		if( expenseArray[i].category == _category )
		{
			tempAmount += expenseArray[i].amount;
		}
	}
	return tempAmount;
	//alert( this.description );
} // End of sumExpenses() function.


// Function name:	countProperties()
// Purpose:		This function will count all properties in an object and return that count to the calling function.
// Parameters:		The name of the object to count properties.
// Returns:		The sum of all properties in the chosen object.
// Preconditions:	none
// Postconditions:	none
function countProperties( obj )
{
	var count = 0;

	for( var prop in obj )
	{
		if( obj.hasOwnProperty( prop ) )
		{
			++count;
			//console.log( 'Count: ' + count );
		}
	}	
	return count;
} // End of countProperties() function.



// Function name:	dropRow()
// Purpose:		This function will add one row to the table, and redraw the table.
// Parameters:		The array offset to drop.
// Returns:		The new array, without the offending entry.
// Preconditions:	none
// Postconditions:	none
function dropRow( _arrayIndex )
{
	//alert( 'Drop Row is not yet implemented.' );
	//expenseArray = expenseArray.splice( _arrayIndex, 1 );
	expenseArray.splice( _arrayIndex, 1 );
	tableRedraw();
} // End of dropRow() function.


// Function name:	addCategory()
// Purpose:		This function will add one category to the table, and redraw the table.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function addCategory()
{
	// Read in the current HTML.
	// Add a row to the table.
	var _category = document.getElementById( 'addCategoryInput' ).value;
	var _budgeted = document.getElementById( 'addBudgetedInput' ).value;
	var totalsRow = {};
	var duplicate = false;

	//alert( 'Add Category is still being implemented, here are the values you entered:\n' + _category + '\n' + _budgeted );

	// Check categoryArray[] for a pre-existing category of this name.
	for( var i = 0; i < categoryArray.length; i++ )
	{
		if( categoryArray[i].category == _category )
		{
			alert( 'A category of this name already exists!' );
			duplicate = true;
			console.log( 'Duplicate category "' + categoryArray[i].category + '" was not re-added.' );
		}
	}
	if( duplicate )
	{
		//alert( 'Unable to add this category due to duplication!' );
	}
	else
	{
		// Add the new category to categoryArray[].
		var tempCategory = new categoryItem( _category, parseInt( _budgeted ), 0 );
		totalsRow = categoryArray.pop();
		//console.log( 'addCategory total: ' + totalsRow.spent );
		categoryArray.push( tempCategory );
		categoryArray.push( totalsRow );
	}
	for( var i = 0; i < categoryArray.length; i++ )
	{
		//console.log( categoryArray[i].category + ' ' + categoryArray[i].budgeted );
	}

	// Update the Select list.
	updateSelect();
	// Redraw the table.
	tableRedraw();
} // End of addCategory() function.


// Function name:	addExpense()
// Purpose:		This function will add one expense to the table, and redraw the table.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function addExpense()
{
	var _category = document.getElementById( 'expenseCategorySelect' ).value;
	var _description = document.getElementById( 'addExpenseDescription' ).value;
	var _amount = document.getElementById( 'addExpenseCost' ).value;
	var _date = document.getElementById( 'addExpenseDate' ).value;
	var _method = document.getElementById( 'addExpensePaymentMethod' ).value;
	var _notes = document.getElementById( 'addExpenseNotes' ).value;

	//alert( 'Add Expense is not yet implemented, but here are the values you entered:\nCategory: ' + _category + '\nDescription: ' + _description + '\nCost: ' + _amount + '\nDate: ' + _date + '\nType: ' + _method + '\nNotes:' + _notes );
	var tempItem = new expenseItem( _category, _description, parseInt( _amount ), _date, _method, _notes );
	//console.log ( 'addExpense() test: ' + tempItem.date );
	expenseArray.push( tempItem );
	var tempSum = parseInt( sumExpenses( _category ) );
	for( var i = 0; i < categoryArray.length; i++)
	{
		if( categoryArray[i].category == _category )
		{
			categoryArray[i].spent += parseInt( _amount );
		}
	}
	tableRedraw();
} // End of addExpense() function.


// Function name:	saveExpenses()
// Purpose:		This function will save both arrays to HTML5 local storage.
// Parameters:		none
// Returns:		none
// Preconditions:	The categor and expense arrays must hold valid data.
// Postconditions:	All expense and category data will be stored in HTML5 local storage.
function saveExpenses()
{
	var tempJSON = {};

	// Store category data.
	tempJSON = JSON.stringify( categoryArray );
	localStorage.categoryData = tempJSON;
	//console.log( localStorage.categoryData );
	//console.log( tempJSON );

	// Store expense data.
	tempJSON = JSON.stringify( expenseArray );
	localStorage.expenseData = tempJSON;
	//console.log( tempJSON );

	updateStorageCount();
} // End of saveExpenses() function.


// Function name:	restoreExpenses()
// Purpose:		This function will build the expense tables based on what is stored in HTML5 local storage.
// Parameters:		none
// Returns:		none
// Preconditions:	Expense and category data must be stored in HTML5 local storage.
// Postconditions:	The category and expense arrays will be wiped and replaced with what is stored in HTML5 local storage.
function restoreExpenses()
{
	//console.log( categoryArray.length );
	var tempLength = categoryArray.length;

	// Remove all data from categoryArray[].
	for( var i = 0; i < tempLength; i++ )
	{
		categoryArray.pop();
	}
	//console.log( 'categoryArray.length: ' + categoryArray.length );

	//console.log( expenseArray.length );
	tempLength = expenseArray.length
	// Remove all data from categoryArray[].
	for( var i = 0; i < tempLength; i++ )
	{
		expenseArray.pop();
	}
	//console.log( 'expenseArray.length: ' + expenseArray.length );

	categoryArray = JSON.parse( localStorage.categoryData );
	//console.log( 'categoryArray.length: ' + categoryArray.length );
	expenseArray = JSON.parse( localStorage.expenseData );
	//console.log( 'expenseArray.length: ' + expenseArray.length );
	//console.log( typeof categoryArray );
	tableRedraw();
} // End of restoreExpenses() function.


function categoryDownload()
{
	document.location = 'data:Application/octet-stream,' + encodeURIComponent( JSON.stringify( categoryArray ) );
}
function expensesDownload()
{
	document.location = 'data:Application/octet-stream,' + encodeURIComponent( JSON.stringify( expenseArray ) );
}

window.onload = readFile;
