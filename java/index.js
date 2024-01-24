let infoInput = [];

const saveBtn = document.getElementById("save-btn");
const ulInfo = document.getElementById("ul-info");
const myLocalStorage = JSON.parse(localStorage.getItem("myFavoriteWebsite"));
const deleteBtn = document.getElementById("delete-btn");
const seldelBtn = document.getElementById("seldel-btn");

if (myLocalStorage) {
  infoInput = myLocalStorage;
  showInfo(infoInput);
}

saveBtn.addEventListener("click", function() {
  let existURL = false;
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    let currentTabURL = tabs[0].url;
    // Check if the current tab is already exist
    for (x of infoInput) {
      if (x === currentTabURL) {
        existURL = true;
        break;
      }
    }
    if (!existURL) {
      // Add new URL to array infoInput
      infoInput.push(currentTabURL);
      // Save the URL list to local storage "myFavoriteWebsite"
      localStorage.setItem("myFavoriteWebsite",JSON.stringify(infoInput));
      // call the function to show the list Info
      showInfo(infoInput);
    }
  });

})

deleteBtn.addEventListener("dblclick", function() {
  // Clear localStorage
  localStorage.clear();
  // Set empty for infoInput array
  infoInput = [];
  // Clear info on the DOM
  showInfo(infoInput); 
})

seldelBtn.addEventListener("click", function() {
  // Get the length of the current URL list
  let lenInfo = infoInput.length;
  // Get all checkbox elements
  let chkURL = document.getElementsByName("urlCheckBox");
  // Create an empty array to store new url list
  let newURL = [];
  // Scan through the checkbox list to skip all selected items
  for (let i = 0; i < lenInfo; i++) {
    if (!chkURL[i].checked) {
      // Add unchecked item to a new array called newURL
      newURL.push(infoInput[i])
    }
  }
  // Set infoInput = newURL
  infoInput = newURL
  // Remove item "myFavoriteWebsite" from localStorage
  localStorage.removeItem("myFavoriteWebsite")
  // Store new URL list to local storage
  localStorage.setItem("myFavoriteWebsite",JSON.stringify(infoInput))
  // call the function to show the list Info
  showInfo(infoInput)
})


function showInfo(infoInput) {
  let listInfo = ""
  let lenInfo = infoInput.length

  for (let i = 0; i < lenInfo; i++) {
    listInfo +=  `
      <li>
        <input type="checkbox" id="${i}" name="urlCheckBox" value="${infoInput[i]}">
        
        <a href = '${infoInput[i]}' target = '_blank'>
          ${infoInput[i]} 
        </a>
      </li>
    `  
  }

  ulInfo.innerHTML = listInfo
}
