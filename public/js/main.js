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
    function(blabs) {
      console.log("Rendering: ", blabs);

      // A. Grab insertion point.
      var $blabsList = $("#blabs-list");

      // B. Store our template.
      //   - 1. write the HTML outline.
      //   - 2. write in the interpolated data.
      var blabTemplate = `
        <article class="blab blab-container">
          <a href="/blabs/<%= _id %>"><h3><%= name %></h3></a>
          <span>
            Created at <%= createdAt %>, by
            <a href="/users/<%= creator %>"><%= creatorHandle %></a>
          </span>
          <!-- <br> -->
          <!-- <button>upvote</button> VoteCount <button>downvote</button> -->
        </article>
      `;

      // C. Generate HTML!
      //   - 1. compile the template into a render function.
      //   - 2. run the object(s) through the render function.
      var renderBlab = _.template(blabTemplate);

      blabs.forEach(function(blab) {
        var blabHtml = renderBlab(blab);

        // D. ...

        // E. Append the HTML to the DOM (at the insertion point)
        $blabsList.append(blabHtml);
      });




    }
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
