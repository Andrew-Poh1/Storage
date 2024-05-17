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

  ListOfObjects[rowIndex]['name'] = `<div onclick = "editHTML('name',${rowNumber})">add item</div>`;
  ListOfObjects[rowIndex]['amount'] = `<div  onclick = "editHTML('amount',${rowNumber})">amount in stock</div>`;
  ListOfObjects[rowIndex]['used'] = `<div onclick = "editHTML('used', ${rowNumber})">amount used?</div>`;
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


function editHTML(elementAttributeName, rowNumber){
  //whenever the user touches the div of any row i want them to be able to edit it. so I will pass through the class of an element and edit it from there on click. now as for every div having this function I just need to add it to the AddRow function.

  // this only changes the first element since they all equaled to the same class name. I have updated the AddRow function such that on click the div elements come with the row number and object attribute now I could access the element from the object list instead of the document query selector
  // old code element = document.querySelector(`.${elementName}`).innerHTML = 'test';

  rowIndex = 'row' + rowNumber;

  ListOfObjects[rowIndex][elementAttributeName] = `<input class = "js-input-${rowIndex}-${elementAttributeName}" placeholder = "enter a value" onkeyup = "
  if (event.key === 'Enter'){
    checkEnter(${rowNumber},${elementAttributeName});
  }
  "></input>`;
  //much has been thought about since last comment. everytime a div is clicked, the rowNumber is given, but also its attribute, so I could edit is specifically. example I click row3 - name then it will make it an input value. now that inputvalue has to have a specific name, so that when i get its value I could get it to change the value at where its at. so the input is in the same spot I want the value of the input to be so I just gave the name to every input box 'js-input-${rowIndex(which is row number)}${element attribute name} now to get that specific input i just use need to type js-input with its corresponding row and element name. Now when the user clicks enter, it will get the value of that specific input and put it into the div that corresponds to it. I hope that makes sense.

  renderHTML();
}
let amount = 'amount';
let used = 'used';
//SO apparently elementAttributeName is a variable upon passing it thorugh html and into an onkeyup function. so to turn them back to a string I just made their variable names into their string names. since I want to use their string name to access the ListOfObjects however all of them work except name, not so sure as to why and I have spent much time searching why elemenyattribute is name it just gives me an empty string, so as we could see the function below as it recives the name variable via the input buttons function onkeyup, I check if the string is emtpy and hard code the elementAttributeName to just simply be 'name' which works fairly well, but it eats me up inside not knowing why something is happening, like why only the variable name comes up with an empty string. Welp that's coding.
function checkEnter(rowNumber, elementAttributeName){

  if (elementAttributeName === ''){
    elementAttributeName = 'name';
  }
  rowIndex = 'row' + rowNumber;
  input = document.querySelector(`.js-input-${rowIndex}-${elementAttributeName}`).value;
  //getting the input value

  ListOfObjects[rowIndex][elementAttributeName] =`<div>${input}</div>`;
  //putting input value in between divs and adding it to back to the objectList

  renderHTML();
  //updating user interface / list
}




