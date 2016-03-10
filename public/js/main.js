console.log('JS loaded!');

// 0. Trigger the LOAD Ajax action (on page load).
$(document).ready(function() {
  loadBlabs();
});

function loadBlabs() {
  // 1. Make an INDEX request.
  $.ajax({
    method: "GET",
    url:    "/blabs"
  })

  // 2. (5.) Parse/log the response.
  .then(
    logSuccess, // Success handler comes first,
    logErrors   // optional (but RECOMMENDED!) error handler comes second.
  )

  // 3. (6.) Finally, render/append the items.
  .then(
    function(blabs) { console.log("Rendering: ", blabs); }
  )
}

function logSuccess(data) {
  console.log("Success: ", data);
  return data; // Return the data so that it is in the
               // next #then in the chain!
}

function logErrors(err) {
  console.log("Failure: ", err);
}
