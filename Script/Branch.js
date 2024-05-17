let rowNumber = 0;
//new rowNumber everytime the add button is pressed
let ListOfObjects = {
  row1:{
    name: '<div>Spring1</div>',
    amount: '<div>4</div>',
    used: '<div>5</div>',
    button: '<div><button>del</button></div>'
  },
  row2:{
    name: '<div>Spring2</div>',
    amount: '<div>4</div>',
    used: '<div>5</div>',
    button: '<div><button>del</button></div>'
  },
  row3:{
    name: '<div>Spring3</div>',
    amount: '<div>4</div>',
    used: '<div>5</div>',
    button: '<div><button>del</button></div>'
  }
}
//computer keeps track of the list on the page.


//Everytime the website is loaded we want the list to be rendered so.
renderHTML();
function renderHTML () {
  //everytime some presses the Add Button I want to add a new row, but I also want to be able  to delete said row at a give point. With a delete button. here is the plan, everytime someone adds a row, there will be a counters passing into functions addRow (rowNumber) this will let me put the row number into the button to be able to delete the entire row (which is in an object) by adding the attribute to the button onclick = "ListOfObjects.remove(rowNumber(of that specific button being made))"

  //so lets start by making the list of objects into html elements we could read. we will do this by looping through the object, since every objects is just the word 'row' with the number they hold i will some how get that number and add row to it. Since everytime we delete a row, that row number wont exist again, so maybe I need something more than just a counter. Either that or make the added rows when they are deleted just become empty strings so that when they are rendered onto the page they do nothing. <3
  

  // getting the length of the objects list

  let html = '';
  //the html we are going to return from the fuction.
  let key, count = 0;
  // Check if every key has its own property
  let rows = [];
  // list to hold all the rows we have.
  for (key in ListOfObjects) {
    if (ListOfObjects.hasOwnProperty(key))
      // If the key is found, add it to the total length
      count++;
      rowIndex = 'row' + count;
      // gettings every count and adding row to it
      rows.push(rowIndex);
  }
  let objectLength = count;
  //just holding objectLength incase for later.


  //now we can call on every row with every value in the array 'rows'
  rows.forEach(function(value){
    //getting each objects values into one variable.
    html += ListOfObjects[value]['name'];
    html += ListOfObjects[value]['amount'];
    html += ListOfObjects[value]['used'];
    html += ListOfObjects[value]['button'];

    //putting all the html into the list orginizer that is displayed to the user 
    document.querySelector('.js-list-organizer')
      .innerHTML = html;
  })

}

function AddRow(rowNumber){
  //everytime we add the row we want to update the the objects, then we want to render the new list to the user. This is where the row number comes into play, we need to know the row number in order to get rid of it but, but we get it whenever we add a row so I pass into the function

  rowIndex = 'row' + rowNumber;
  //getting the row number into the lists of objects format
  ListOfObjects[rowIndex] = {
    name: '',
    amount: '',
    used: '',
    button: ''
  };

  ListOfObjects[rowIndex]['name'] = '<div>add item</div>';
  ListOfObjects[rowIndex]['amount'] = '<div>amount in stock</div>';
  ListOfObjects[rowIndex]['used'] = '<div>amount used?</div>';
  ListOfObjects[rowIndex]['button'] = `<div><button onclick = "deleteRow(${rowNumber})">del</button></div>`;
  //creating the row object, then adding all the things to that row number where after the user could change the 

  renderHTML();
  // update screen every time add function happens

}

function deleteRow(rowNumber){
  //so we know that as soon as the delete button is pressed, we want the row object name a we want to get rid of it. first step it to obtain row number of delete button.
  rowIndex = 'row' + rowNumber;

  ListOfObjects[rowIndex]['name'] = '';
  ListOfObjects[rowIndex]['amount'] = '';
  ListOfObjects[rowIndex]['used'] = '';
  ListOfObjects[rowIndex]['button'] = '';
  // *old code* delete ListOfObjects[rowIndex];
  //since the row number will be in each delete button i decided to make the object name, be accessed by every delete button. 
  console.log(ListOfObjects);
  renderHTML();
  //after I remove it I want the new list to be rendered

  //** whenever I remove a row it ruins the count of the render list example if I have three rows. and i delete row two. we still got rowIndex 'row1' and rowindex 'row3' when the render function runs it will have a list of rows[i] matching the length of the object in objectLists. so row1 will be equaled to row1, but row three will be equal to row2 and it wont be able to render since row 2 does not exist. to fix this instead of deleting the object, I will just make each of their attributes just be an empty string so that when they are added to the html its just empty space.** 

  //this works greatly but the list will be very long if used for a long enough time. not something I particulary worry about but some room for improvement, as of now it works.
}


