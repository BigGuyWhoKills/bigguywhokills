 /*
File Prologue
Name: Adam Howell
Project: CS 2550 Project
Date: 2015-08-04
Description: This project will (eventually) be a fully functional expense tracker and budget tool.

I declare that the following source code was written by me, or is common knowledge, or was taken from the public domain.
*/


	'use strict';


// Function name:	targetCells()
// Purpose:		This function will assign all table data cells an onclick handler.
// Parameters:		An element ID for the table we wish to manipulate.
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function targetCells( _tableId )
{
	// Store every <td> tag from the table with the provided ID into the variable 'cells'.
	var table = document.getElementById( _tableId );
	var cells = table.getElementsByTagName( 'td' );

	// Run through every cell, assigning an onclick handler.
	for( var i = 0; i < cells.length; i++ )
	{
		// Call the cellOnClick function to request an updated value from the user.
		cells[i].onclick = function() { cellOnClick( this, _tableId ) };
	}
} // End of targetCells() function.


// Function name:	cellOnClick()
// Purpose:		This function will allow the user to change the value of the cell.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function cellOnClick( _this, _tableId )
{
	// Save a variable for column and row.
	var col = _this.cellIndex;
	var row = _this.parentNode.rowIndex;

	// Subtract 1 from row so it aligns with the array index.
	row--;

	//alert( 'cellOnClick ' + col );

	if( _tableId == 'categoryHTML' )
	{
		// Put the x and y offset of the clicked cell into the categoryResults div.
		document.getElementById( 'categoryResults' ).innerHTML = 'Row/Column: ' + row + '/' + col;
		if( row < ( categoryArray.length - 1 ) )
		{
			//console.log( 'table: ' + _tableId + ', row: ' + row + ', col: ' + col );
			if( col == 1 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				//console.log( 'Old value: ' + categoryArray[row].budgeted );
				categoryArray[row].budgeted = parseInt( newValue );
				categoryArray[row].net = categoryArray[row].budgeted - categoryArray[row].spent;
				//console.log( 'New value: ' + categoryArray[row].budgeted );
			}
		}
		// If the user selects Cancel.
		if( newValue === null )
		{
			//alert( 'User selected Cancel, no change will be made.' );
			document.getElementById( 'categoryResults' ).innerHTML = 'User canceled input';
		}
		else if( newValue == _this.innerHTML )
		{
			//alert( 'Value was not changed.' );
			//document.getElementById( 'categoryResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
		}
		else
		{
			if( row < ( categoryArray.length - 1 ) )
			{
				if( col == 1 )
				{
					// Change the CSS for this individual cell.
					_this.style.background = 'gray';
					//alert( 'if ' + _tableId );
					// Set the selected cell to the newly entered value.
					categoryHTML.rows[row + 1].cells[col].innerHTML = newValue;
				}
			}
		}
	}
	else if( _tableId == 'expenseHTML' )
	{
		console.log( 'table: ' + _tableId + ', row: ' + row + ', col: ' + col );

		if( col < ( 6 ) )
		{
			// Put the x and y offset of the clicked cell into the expenseResults div.
			document.getElementById( 'expenseResults' ).innerHTML = 'Row/Column: ' + row + '/' + col;
			// Change the CSS for this individual cell.
			_this.style.background = 'gray';
			if( col == 0 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				// If the user selects Cancel.
				if( newValue === null )
				{
					//alert( 'User selected Cancel, no change will be made.' );
					document.getElementById( 'expenseResults' ).innerHTML = 'User canceled input';
				}
				else if( newValue == _this.innerHTML )
				{
					//alert( 'Value was not changed.' );
					//document.getElementById( 'expenseResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
				}
				else
				{
					for( var i = 0; i < categoryArray.length; i++ )
					{
						// Verify that the category exists before allowing the expense to be set to that value.
						if( newValue == categoryArray[i].category && newValue != 'Total' )
						{
							expenseArray[row].category = newValue;
							expenseHTML.rows[row + 1].cells[col].innerHTML = newValue;
						}
					}
				}
			}
			if( col == 1 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				// If the user selects Cancel.
				if( newValue === null )
				{
					//alert( 'User selected Cancel, no change will be made.' );
					document.getElementById( 'expenseResults' ).innerHTML = 'User canceled input';
				}
				else if( newValue == _this.innerHTML )
				{
					//alert( 'Value was not changed.' );
					//document.getElementById( 'expenseResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
				}
				else
				{
					expenseArray[row].description = newValue;
					expenseHTML.rows[row + 1].cells[col].innerHTML = newValue;
				}
			}
			if( col == 2 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				// If the user selects Cancel.
				if( newValue === null )
				{
					//alert( 'User selected Cancel, no change will be made.' );
					document.getElementById( 'expenseResults' ).innerHTML = 'User canceled input';
				}
				else if( newValue == _this.innerHTML )
				{
					//alert( 'Value was not changed.' );
					//document.getElementById( 'expenseResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
				}
				else
				{
					expenseArray[row].amount = parseInt( newValue );
					expenseHTML.rows[row + 1].cells[col].innerHTML = newValue;
				}
			}
			if( col == 3 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				// If the user selects Cancel.
				if( newValue === null )
				{
					//alert( 'User selected Cancel, no change will be made.' );
					document.getElementById( 'expenseResults' ).innerHTML = 'User canceled input';
				}
				else if( newValue == _this.innerHTML )
				{
					//alert( 'Value was not changed.' );
					//document.getElementById( 'expenseResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
				}
				else
				{
					expenseArray[row].date = newValue;
					expenseHTML.rows[row + 1].cells[col].innerHTML = newValue;
				}
			}
			if( col == 4 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				// If the user selects Cancel.
				if( newValue === null )
				{
					//alert( 'User selected Cancel, no change will be made.' );
					document.getElementById( 'expenseResults' ).innerHTML = 'User canceled input';
				}
				else if( newValue == _this.innerHTML )
				{
					//alert( 'Value was not changed.' );
					//document.getElementById( 'expenseResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
				}
				else
				{
					expenseArray[row].method = newValue;
					expenseHTML.rows[row + 1].cells[col].innerHTML = newValue;
				}
			}
			if( col == 5 )
			{
				// Prompt the user for a new value.
				var newValue = prompt( 'New value', _this.innerHTML );
				// If the user selects Cancel.
				if( newValue === null )
				{
					//alert( 'User selected Cancel, no change will be made.' );
					document.getElementById( 'expenseResults' ).innerHTML = 'User canceled input';
				}
				else if( newValue == _this.innerHTML )
				{
					//alert( 'Value was not changed.' );
					//document.getElementById( 'expenseResults' ).innerHTML = 'Value in row ' + row + ', column ' + col ' was not changed.';
				}
				else
				{
					expenseArray[row].notes = newValue;
					expenseHTML.rows[row + 1].cells[col].innerHTML = newValue;
				}
			}
		}
	}
	tableRedraw();
} // End of cellOnClick() function.



// Function name:	buildCategoryTable()
// Purpose:		This function will read data from categoryArray[] and create valid HTML.
// Parameters:		none
// Returns:		none
// Preconditions:	categoryArray[] should have valid data.
// Postconditions:	none
function buildCategoryTable()
{
	var categoryTable = '';	// This string will hold the HTML that becomes the category table.
	var totalBudgeted = 0;
	var totalSpent = 0;
	var tempNum = 0;

	// Pop the 'Total' row off categoryArray[].
	categoryArray.pop();
	// Calculate the data to be used in the creation of the new 'Total' row.
	for( var i = 0; i < categoryArray.length; i++ )
	{
		// Sum all expenses for this category.
		categoryArray[i].spent = sumExpenses( categoryArray[i].category );
		// Add the budgeted for this row to the running total.
		totalBudgeted += parseInt( categoryArray[i].budgeted );
		// Add the spent for this row to the running total.
		totalSpent += parseInt( categoryArray[i].spent );
		// Update the 'Net amount' column.  This is actually here not for the 'Total' line, but to get the 'Net amount' column to refresh properly on the HTML page.
		categoryArray[i].net = categoryArray[i].budgeted - categoryArray[i].spent;
	}
	// Create the new 'Total' row.
	var tempLine = new categoryItem( 'Total', totalBudgeted, totalSpent );
	// Push the new 'Total' row onto categoryArray[].
	categoryArray.push( tempLine );

	// If the userName exists in localStorage.
	if( localStorage.userName )
	{
		// Add the logged-in userName to the table caption.
		categoryTable = '<table style="width:40%" id="categoryHTML"><caption>' + localStorage.userName + "'s expense tracker</caption>";
	}
	else
	{
		// Create a generic caption.
		categoryTable = "<table><caption>Anonymous' expense tracker</caption>";
	}
	// Add the table headers.
	categoryTable += '<tr><th>Category</th><th>Budgeted amount</th><th>Spent amount</th><th>Net amount</th></tr>';
	//categoryTable += '<tr><th>Category</th><th>Budgeted amount</th></tr>';

	// Build the HTML table.
	for( var rowNum = 0; rowNum < categoryArray.length; rowNum++ )
	{
		// Build the table rows and table data cells.  I have organized this for editing convenience.
		if( rowNum % 2 )
		{
			categoryTable += '<tr class="medium"><td>';
		}
		else
		{
			categoryTable += '<tr class="light"><td>';
		}
		categoryTable += categoryArray[rowNum].category;
		categoryTable += '</td><td class="right">';
		tempNum = categoryArray[rowNum].budgeted;
		categoryTable += tempNum.toFixed( 2 );
		categoryTable += '</td><td class="right">';
		if( isNaN( categoryArray[rowNum].spent ) )
		{
			categoryArray[rowNum].spent = 0;
			categoryArray[rowNum].net = categoryArray[rowNum].budgeted - categoryArray[rowNum].spent
			console.log( 'New category name: ' + categoryArray[rowNum].category + ', budgeted: ' + categoryArray[rowNum].budgeted + ', spent: ' + categoryArray[rowNum].spent + ', net: ' + categoryArray[rowNum].net );
		}
		else
		{
			//console.log( 'Category name: ' + categoryArray[rowNum].category + ', budgeted: ' + categoryArray[rowNum].budgeted + ', spent: ' + categoryArray[rowNum].spent + ', net: ' + categoryArray[rowNum].net );
		}
		tempNum = parseInt( categoryArray[rowNum].spent );
		categoryTable += tempNum.toFixed( 2 );
		categoryTable += '</td><td class="right"';
		tempNum = parseInt( categoryArray[rowNum].net );
		if( tempNum < 0 )
		{
			categoryTable += ' bgcolor="#990000"';
		}
		categoryTable += '>';
		categoryTable += tempNum.toFixed( 2 );
		categoryTable += '</td></tr>';
	}
	categoryTable += '</table>';
	// Export the entire table HTML to the console log.
	//console.log( categoryTable );
	document.getElementById( 'categoryHTML' ).innerHTML = categoryTable;
	// Add the click handler to each cell in this table.
	targetCells( 'categoryHTML' );
} // End of buildCategoryTable() function.



// Function name:	buildExpenseTable()
// Purpose:		This function will read data from expenseArray[] and create valid HTML.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function buildExpenseTable()
{
	var expenseTable = '';	// This string will hold the HTML that becomes the expense table.
	var tempNum = 0;
	//alert( expenseArray.length );

	// Update the default date value in the add new expense fieldset.
	updateDate();

	// Sort expenseArray[] by date.
	expenseArray.sort( function( a, b )
	{
	    if ( a.date > b.date )
	        return 1;
	    else if ( a.date < b.date )
	        return -1;
	    else
	        return 0;
	} );
	// Sort expenseArray[] by category.
	expenseArray.sort( function( a, b )
	{
	    if ( a.category > b.category )
	        return 1;
	    else if ( a.category < b.category )
	        return -1;
	    else
	        return 0;
	} );

	// Build the table and headers.
	expenseTable = '<table style="width:60%" id="expenseHTML"><caption>Expenses</caption><tr><th>Category</th><th>Description</th><th>Amount</th><th>Date</th><th>Payment Method</th><th>Notes</th><th>Del?</th></tr>';

	// Build the HTML table using the dimensions passed to this function, and populate it with the model data.
	for( var rowNum = 0; rowNum < expenseArray.length; rowNum++ )
	{
		// Build the table rows and table data cells.  I have organized this for editing convenience.
		//expenseTable += '<tr><td>';
		if( rowNum % 2 )
		{
			expenseTable += '<tr class="medium"><td>';
		}
		else
		{
			expenseTable += '<tr class="light"><td>';
		}

/*		var categorySelectHTML = '<select>';
		for( var i = 0; i < ( categoryArray.length - 1 ); i++ )
		{
			categorySelectHTML += '<option value="' + categoryArray[i].category + '">' + categoryArray[i].category + '</option>';
		}
		categorySelectHTML += '</select>';
		expenseTable += categorySelectHTML
*/
		expenseTable += expenseArray[rowNum].category;
		//console.log( 'category: ' + expenseArray[rowNum].category );
		expenseTable += '</td><td>';
		expenseTable += expenseArray[rowNum].description;
		//console.log( 'description: ' + expenseArray[rowNum].description );
		expenseTable += '</td><td class="right">';
		tempNum = parseInt( expenseArray[rowNum].amount );
		expenseTable += tempNum.toFixed( 2 );
		//console.log( 'amount: ' + expenseArray[rowNum].amount );
		expenseTable += '</td><td>';
		expenseTable += expenseArray[rowNum].date;
		//console.log( 'date: ' + expenseArray[rowNum].date );
		expenseTable += '</td><td>';
		expenseTable += expenseArray[rowNum].method;
		//console.log( 'method: ' + expenseArray[rowNum].method );
		expenseTable += '</td><td>';
		expenseTable += expenseArray[rowNum].notes;
		//console.log( 'notes: ' + expenseArray[rowNum].notes );
		expenseTable += '</td>';
		expenseTable += '<td><input type="button" value="-" onclick="dropRow( ' + rowNum + ' )"></td></tr>';
	}
	expenseTable += '</table>';
	// Export the entire table HTML to the console log.
	//console.log( expenseTable );
	document.getElementById( 'expenseHTML' ).innerHTML = expenseTable;
	// Add the click handler to each cell in this table.
	targetCells( 'expenseHTML' );
} // End of buildExpenseTable() function.



// Function name:	updateLoginDiv()
// Purpose:		This function will update the login information on the current page.
// Parameters:		none
// Returns:		none
// Preconditions:	A 'loginInfo' div needs to exist.
// Postconditions:	The 'loginInfo' div will either show the userName of the person logged in, or it will indicate that local storage is empty.
function updateLoginDiv()
{
	if (localStorage.getItem('userName') === null)
	{
		document.getElementById( 'loginInfo' ).innerHTML = 'Local storage appears to have been deleted.<br>Please log in again to populate the appropriate fields.';
	}
	else
	{
		document.getElementById( 'loginInfo' ).innerHTML = 'User ' + localStorage.userName + ' logged in at: ' + localStorage.cs2550timestamp;
	}
} // End of updateLoginDiv() function.


function updateSelect()
{
	var categorySelectHTML = '';
	for( var i = 0; i < ( categoryArray.length - 1 ); i++ )
	{
		categorySelectHTML += '<option value="' + categoryArray[i].category + '">' + categoryArray[i].category + '</option>';
	}
	//console.log( categorySelectHTML );
	document.getElementById( 'expenseCategorySelect' ).innerHTML = categorySelectHTML;
} // End of updateSelect() function.


// Function name:	tableRedraw()
// Purpose:		This function will recalculate the net amount for each row,
//				and the total for each column, and the redraw the table with those new values.
// Parameters:		none
// Returns:		none
// Preconditions:	none
// Postconditions:	none
function tableRedraw()
{
	// Get the state of the current table, determine new net amounts (right-most column), and determine new totals (final row).

	// I may read the entire table as it is (new values should already be present), and then rebuild it, ignoring the net amount column and total row.
	//alert( 'Recalculation is not yet implemented.' );
	buildCategoryTable();
	buildExpenseTable();

} // End of tableRedraw() function.


function updateDate()
{
	var today = new Date().toJSON();
	document.getElementById( 'addExpenseDate' ).value = today.slice( 0,10 );
}
