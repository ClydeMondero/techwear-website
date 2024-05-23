$(document).ready(function () {
  $(".dashboard-container").hide();

  fetchUsers();
});

let users = [];

function fetchUsers() {
  let usersReq = new XMLHttpRequest();
  usersReq.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      users = JSON.parse(this.responseText);

      displayUsers();
    }
  };

  usersReq.open("GET", "api/users/fetch.php", true);
  usersReq.send();
}

function displayUsers() {
  $("#users-body").empty();

  let searchVal = $("#search").val().toLowerCase();

  let filterTerm = $("#filter").val();

  users.forEach((user) => {
    if (user.full_name.toLowerCase().includes(searchVal) || !searchVal) {
      if (filterTerm == user.payment_method || !filterTerm) {
        let userTableRow = $("<tr></tr>");
        userTableRow.append($("<td></td>").text(user.id));
        userTableRow.append($("<td></td>").text(user.full_name));
        userTableRow.append($("<td></td>").text(user.username));
        userTableRow.append($("<td></td>").text(user.email));
        userTableRow.append($("<td></td>").text(user.address));
        userTableRow.append($("<td></td>").text(user.contact_number));
        userTableRow.append($("<td></td>").text(user.payment_method));

        $("#users-body").append(userTableRow);
      }
    }
  });
}
