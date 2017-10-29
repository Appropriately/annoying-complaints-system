// checkPassword to replace function in:
// <element onchange="function()">
// where element is the password entry box
// get the password value, store in pword
// TODO: Change all document.getElementById....
function checkPassword() {
  pword = $("#pword").val();
  pwordLen = $("#pword").val().length;

  if(pwordLen < 15){
    errorMsg = "Password must be at least 15 characters long.";
    document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
  }

  var reDifSpecChars = /(\W(.)*){2,}/;
  var SpecChar = /\W/;
  var indexFirstSC = pword.search(reDifSpecChars);
  var twoDifSpec = false;

  if (indexFirstSC > -1) {
    var firstSC = pword.charAt(pword.search(reDifSpecChars));
    var restOfPW = pword.slice(pword.search(reDifSpecChars) + 1);
    while1: while (restOfPW.search(SpecChar) != -1) {
      if (firstSC != restOfPW.charAt(restOfPW.search(SpecChar))) {
        twoDifSpec = true;
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
    document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
  }

  var re3Num =  /\d(.)*\d(.)*\d/;
  if (!(pword.search(re3Num) > -1)){
    errorMsg = "Password must contain at least 3 numbers.";
    document.getElementById("pwordErrorMsg").innerHTML = errorMsg;
  }

  if((pwordLen > 14) && twodDifSpec && (pword.search(reConSeqNum) == -1) && (pword.search(re3Num) > -1 )) {
    document.getElementById("pwordErrorMsg").innerHTML = "";
  }


}

// call this function on entering the password box
function generatePWrdSuggestions() {
  
    var adjectives = ["annoying", "complaining", "arrogant", "bitter", "Massive", "Rude"];
    var nouns = ["Prick", "Spanner", "Wnkr", "Dude", "Tool", "Sheep", "Twat"];
    var numberSeq = [123, 99, 12345, 1, 2, 3, 007, 69, 1337, 27, 666, 777];
    var generatedPWrd = new Array(3);
    var pwrdSuggestions, adj, noun, numSeq;
  
    for (i = 0; i < generatedPWrd.length; i++) {
      adj = adjectives[Math.round(Math.random() * (adjectives.length - 1))];
      noun = nouns[Math.round(Math.random() * (nouns.length - 1))];
      numSeq = numberSeq[Math.round(Math.random() * (numberSeq.length - 1))];
  
      generatedPWrd[i] = adj + noun + numSeq;
    }
  
    pwrdSuggestions = "suggestions: " + generatedPWrd[0] + ", " + generatedPWrd[1] + ", " + generatedPWrd[2] + ".";
  
    // Change so correct HTML element has password suggestions loaded in it
    document.getElementById("pwordSuggest").innerHTML = pwrdSuggestions
  
  }
