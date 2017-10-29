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
  document.getElementById("pwordErrorMsg").innerHTML = pwrdSuggestions

}
