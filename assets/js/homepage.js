let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");
let languageButtonsEl = document.querySelector("#language-buttons");

let formSubmitHandler = function (event) {
  // prevent refreshing
  event.preventDefault();

  // get value from input element
  let username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old conent
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a username");
  }
};

let buttonClickHandler = function (event) {
  // get the language attr
  let language = event.target.getAttribute("data-language");
  console.log(language);

  if (language) {
    getFeatureRepos(language);

    // clear older content
    repoContainerEl.textContent = "";
  }
};

let getUserRepos = function (user) {
  // format the github api url to call "user" args
  let apiURL = "https://api.github.com/users/" + user + "/repos";

  // Call request to url using fetch
  fetch(apiURL)
    .then(function (response) {
      // wrapping if/else to pick up 404 status code
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert("Error: Github User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connet to Github");
    });
};

let displayRepos = function (repos, searchTerm) {
  // check if API returns any repositories
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (let i = 0; i < repos.length; i++) {
    // format repo name
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    let repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repo name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    let statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if currecnt repo has issuses or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issuse(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

let getFeatureRepos = function (language) {
  let apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
        console.log(response);
        console.log(data);
      });
    } else {
      alert("Error: GitHub User Not Found");
    }
  });
};

// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler); //
