var mongoose = require('./database');

var User = require('../models/user');
var Blab = require('../models/blab');

// Define users on the global scope to share between
// promises.
var users;

/*
 * Seed the database.
 */

console.log("Removing users…");
User.remove({})

.then(function() {
  process.stdout.write("Creating users: "); // like console.log!
  return User.create(definedUsers());
})

.then(function(createdUsers) {
  users = createdUsers; // save the users list!
  console.log("Database seeded with " + users.length  + " users.");
})

.then(function() {
  console.log("Removing blabs…");
  Blab.remove({})
  .then(function() {
    process.stdout.write("Creating blabs: ");
    return Blab.create(definedBlabs(users));
  })

  .then(function(blabs) {
    console.log("Database seeded with " + blabs.length  + " blabs.");
  })

  // Catch and log any errors along the chain.
  .catch(function(err) {
    console.log("Error:", err);
  })

  // Finish the chain.
  .then(
    closeMongoConnection, // when the chain is successful…
    closeMongoConnection  // when the chain has failed…
  )
});



function closeMongoConnection() {
  mongoose.connection.close(function(err) {
    if (err) console.log(err);
    process.exit(0);
  });
}

/*
 * Define seed data for users and blabs!
 */

function definedUsers() {
  return [
    { handle: "storyme",      email: "joseph.story@us.courts.gov" },
    { handle: "blackjustice", email: "hugo.black@us.courts.gov" },
    { handle: "pj",           email: "pj@ga.co", moderator: true }
  ];
}

function definedBlabs(users) {
  return [
    {
      name: "cats",
      creator: users[2],
      creatorHandle: users[2].handle,
      posts: [
        {
          author: users[0], authorHandle: users[0].handle,
          title: "I love cats!", body: "lorem ipsum",
          comments: [
            {
              author: users[1], authorHandle: users[1].handle,
              body: "Enough with the cats already.",
              comments: [
                {
                  author: users[0], authorHandle: users[0].handle,
                  body: "Why are you here if you don't like cats?"
                }
              ]
            }, {
              author: users[2], authorHandle: users[2].handle,
              body: "Cats give me allergies."
            }
          ]
        }, {
          author: users[0], authorHandle: users[0].handle,
          title: "Here's a story about my cat", body: "lorem ipsum",
          comments: []
        }, {
          author: users[1], authorHandle: users[1].handle,
          title: "What's the deal with cats?", body: "lorem ipsum",
          comments: []
        }, {
          author: users[0], authorHandle: users[0].handle,
          title: "Cats: good or great!", body: "lorem ipsum",
          comments: []
        }, {
          author: users[2], authorHandle: users[2].handle,
          title: "Cat allergies :(", body: "lorem ipsum",
          comments: []
        }
      ]
    }, {
      name: "important_cultural_events",
      creator: users[2],
      creatorHandle: users[2].handle,
      posts: []
    }, {
      name: "blue_or_black",
      creator: users[2],
      creatorHandle: users[2].handle,
      posts: [
        {
          author: users[1], authorHandle: users[1].handle,
          title: "That dress is black!", body: "lorem ipsum",
          comments: []
        }, {
          author: users[0], authorHandle: users[0].handle,
          title: "Dress looks blue to me.", body: "lorem ipsum",
          comments: []
        }, {
          author: users[1], authorHandle: users[1].handle,
          title: "Why are people so wrong about the dress?", body: "lorem ipsum",
          comments: []
        }, {
          author: users[1], authorHandle: users[1].handle,
          title: "Open your eyes!", body: "lorem ipsum",
          comments: []
        }
      ]
    }
  ];
}
