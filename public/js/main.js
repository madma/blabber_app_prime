console.log('JS loaded!');

var $blabsList;
var renderBlab = _.template(`
  <article id="<%= _id %>" class="blab blab-container">
    <a href="/blabs/<%= _id %>"><h3><%= name %></h3></a>
    <span>
      Created at <%= createdAt %>, by
      <a href="/users/<%= creator %>"><%= creatorHandle %></a>
    </span>
    <!-- <br> -->
    <!-- <button>upvote</button> VoteCount <button>downvote</button> -->
    <button class="blab-remove" data-blab-id="<%= _id %>" >delete</button>
  </article>
`);

$(document).ready(function() {
  $blabsList = $("#blabs-list");
  loadBlabs();
});

function renderAndAppendComponent(blab) {
  var blabComponent  = renderBlab(blab);
  var $blabComponent = $(blabComponent);

  $blabComponent.find(".blab-remove").on("click", function(evt) {
    var $button = $(evt.target);
    var id = $button.data("blab-id");
    removeBlab(id, $blabComponent);
  });

  $blabsList.append($blabComponent);
}

function loadBlabs() {
  $.ajax({
    method: "GET",
    url:    "/blabs"
  })

  .then(
    logSuccess,
    logErrors
  )

  .then(function(blabs) {
    console.log("Rendering: ", blabs);

    blabs.forEach(function(blab) {
      renderAndAppendComponent(blab);
    });
  });
}

function removeBlab(id, $blabComponent) {
  $.ajax({
    method: "DELETE",
    url:    "/blabs/" + id
  })

  .then(
    logSuccess,
    logErrors
  )

  .then(function(data) {
    $blabComponent.remove();
  });
}

function logSuccess(data) {
  console.log("Success: ", data);
  return data; // Return the data so that it is in the
               // next #then in the chain!
}

function logErrors(err) {
  console.log("Failure: ", err);
}
