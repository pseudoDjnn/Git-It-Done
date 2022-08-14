let getUserRepos = function (user) {
  // format the github api url to call "user" args
  let apiURL = "https://api.github.com/users/" + user + "/repos";

  // Call request to url using fetch
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getUserRepos();
