var genders = ["Male", "Female", "Other"];
var ethnicity = ["White", "Asian", "Black", "Mixed"];

$(document).on("click", "#random", function () {
  console.log("Randomize information.");
  $("#gen").val(genders[Math.floor(Math.random() * genders.length)]);
  $("#eth").val(ethnicity[Math.floor(Math.random() * ethnicity.length)]);
});

