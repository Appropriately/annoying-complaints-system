// checkPassword to replace function in:
// <element onchange="function()">
// where element is the password entry box
// get the password value, store in pword
// TODO: Change all document.getElementById....
function checkPassword() {
  pword = $("#pword").val();

  if(pword.length < 15){
    errorMsg = "Password must be at least 15 characters long.";
    document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
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
      errorMsg = "Password must contain two different special characters.";
      document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
    }
  } else {
    errorMsg = "Password must contain two different special characters.";
    document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
  }

  var reConSeqNum = /\d\d/;
  if (pword.search(reConSeqNum) > 0){
    errorMsg = "Password cannot have 2 consecutive numbers.";
    document.getELementById("pwordErrorMsg").innerHTML = errorMsg;
  }

  var re3Num =  /\d(.)*\d(.)*\d/;
  if (!(pword.search(re3Num) > -1)){
    errorMsg = "Password must contain at least 3 numbers.";
    document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
  }
}
