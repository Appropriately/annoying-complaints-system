// selector needs to be button to create a complaint
$("#create-complaint-button").click(initialiseQueue());

function initialiseQueue() {
  $.get("localhost/api/addToQueue");
  setInterval(waiting(), 5000);

  // now leave the queue
  $.get("localhost/api/leaveQueue");
}

function waiting() {
  $.get("localhost/api/getQueuePosition", function(queuePos){
    //window.location.href = "localhost/complaintsPage";
    // now load the actual complaints page
  });
}