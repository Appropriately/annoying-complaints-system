// checkPassword to replace function in:
// <element onchange="function()">
// where element is the password entry box
// need to pass the value of the password

// TODO: Change all document.getElementById.... 
function checkPassword(pword) {
  if(pword.length < 15){
    alert("Password must be at least 15 characters long.");
    //document.getElementById("pwordFeedback").innerHTML = "error;
  }
  
  var reDifSpecChars = /(\W(.)*){2,}/;
  var SpecChar = /\W/;
  var indexFirstSC = pword.search(reDifSpecChars);
  
  if (indexFirstSC > -1) {
    var firstSC = pword.charAt(pword.search(reDifSpecChars));
    var restOfPW = pword.slice(pword.search(reDifSpecChars) + 1);
    while1: while (restOfPW.search(SpecChar) != -1) {
      if (firstSC != restOfPW.charAt(restOfPW.search(SpecChar))) {
        break while1;
      } else {
        restOfPW = restOfPW.slice(restOfPW.search(SpecChar) + 1);
      }
    }
  
    if (restOfPW.search(SpecChar) == -1) {
      alert("Password must contain two different special characters.");
      //document.getElementById("pwordFeedback").innerHTML = "error";
    }
  } else {
    alert("Password must contain two different special characters.");
    //document.getElementById("pwordFeedback").innerHTML = "error";
  }
  
  var reConSeqNum = /\d\d/;
  if (pword.search(reConSeqNum) > 0){
    alert("Password cannot have 2 consecutive numbers.");
    //document.getELementById("pwordFeedback").innerHTML = "error";
  }
  
  var re3Num =  /\d(.)*\d(.)*\d/;
  if (!(pword.search(re3Num) > -1)){
    alert("Password must contain at least 3 numbers.");
    //document.getElementById("pwordFeedback").innerHTML = "error";
  }
}