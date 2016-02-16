This file will explain how JSON is used and where the information is displayed.

I opted to use a JSON file instead of XML due to the simplicity of converting to and from JSON and JavaScript objects.
This assignment (#6) uses a JSON file to load expense data from.
All of my displayed file data is shown the "game" page, expenses.html.

-My game page (expenses.html) will read from gamedata.json (located in the root directory of this folder or archive).  This JSON file does not contain "net" values, as that is calculated when the table is built.
-This is done in storage.js, in a function named readFile().
-That JSON data will be parsed into JavaScript objects (matching my categoryItem and expenseItem types).
-Those objects are sent to my categoryItem() function to calculate the net value.
-The output from categoryItem() is then loaded into my array named categoryRows[].
-Once in categoryRows[], the control logic builds an HTML table from the data and push that table to the game grid (the innerHTML of the element).

I added the login userName to the caption of the table.  If the local storage does not exist when the table is built, that caption will be renamed to "Anonymous' budget".
