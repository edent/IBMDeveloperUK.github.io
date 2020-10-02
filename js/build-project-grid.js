var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.github.com/users/IBMDeveloperUK/repos?per_page=100",
  true
);
request.onload = function () {
  let data = JSON.parse(this.response);
  console.log("project data array", data);

  function makeProjectGrid() {
    // Establish the array which acts as a data source for the list
    let listData = data,
      // Set up the loop that goes through the array 1 index at a time
      numberOfListItems = listData.length,
      listItem,
      i;

    for (i = 0; i < numberOfListItems; ++i) {
      listData[i].name = listData[i].name.replace(/-/g, " ");
      // create a project tile for each repository
      projectContainer = document.createElement("div");
      projectContainer.id = "project-container";
      projectContainer.className = "project-container";
      document
        .getElementById("project-container-list")
        .appendChild(projectContainer);

      project = document.createElement("div");
      project.id = "project";
      project.className = "project";
      projectContainer.appendChild(project);

      projectContents = document.createElement("div");
      projectContents.id = "project-contents";
      project.appendChild(projectContents);

      title = document.createElement("h3");
      title.id = "title";
      title.innerHTML = listData[i].name;
      projectContents.appendChild(title);

      description = document.createElement("p");
      description.id = "description";
      if (listData[i].description) {
        description.innerHTML = listData[i].description;
      } else {
        description.innerHTML = "No description to show!";
      }
      projectContents.appendChild(description);

      language = document.createElement("p");
      language.id = "language";
      language.innerHTML = listData[i].language;
      projectContents.appendChild(language);

      link = document.createElement("a");
      link.id = "link";
      link.className = "primary-button";
      link.innerHTML = "View Project on GitHub";
      link.href = listData[i].html_url;
      link.target = "_blank";
      projectContents.appendChild(link);
    }
  }

  makeProjectGrid();
};
request.send();
