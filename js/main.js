document.addEventListener("DOMContentLoaded", (event) => {
  var current_backed_amount = 89914;
  var current_total_backer = 5007;
  var days_left = 56;
  var target_amount = 100000;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var update_back_information = (new_amount) => {
    current_backed_amount += new_amount;
    current_total_backer += 1;

    var backed_amount_element = document.querySelector("#backed_amount");
    var total_backer_element = document.querySelector("#total_backer");
    var days_left_element = document.querySelector("#days_left");
    var progress_bar_element = document.querySelector("#progress-bar");

    backed_amount_element.innerHTML =
      "$" + numberWithCommas(current_backed_amount);
    total_backer_element.innerHTML = numberWithCommas(current_total_backer);
    days_left_element.innerHTML = "" + days_left;
    progress_bar_element.style.width =
      "" + (current_backed_amount / target_amount) * 100 + "%";
  };

  update_back_information(0);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  document.getElementById("bookmark").addEventListener("click", function () {
    document.getElementById("bookmark").classList.toggle("bookmarked");
    if (document.getElementById("bookmark").classList.contains("bookmarked")) {
      document.getElementById("bookmark-button").innerHTML = "Bookmarked";
    } else {
      document.getElementById("bookmark-button").innerHTML = "Bookmark";
    }
  });

  document
    .querySelector(".select-pledge-close")
    .addEventListener("click", (event) => {
      is_show_select_pledge_modal(false);
      event.preventDefault();
    });

  document
    .querySelector("#back-project-button")
    .addEventListener("click", (event) => {
      is_show_select_pledge_modal(true);
      select_pledge("none");
      event.preventDefault();
    });

  document
    .querySelectorAll(".backitem .backitem-footer a")
    .forEach((element, key) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        is_show_select_pledge_modal(true);
        select_pledge("item-" + (key + 2));
      });
    });

  var pledge_radios = document.querySelectorAll(".select-pledge-radio");
  var selected_pledge = null;
  var select_pledge = (selected_id) => {
    document.querySelectorAll(".select-pledge-item").forEach((element, key) => {
      var input_element = element.querySelector("#" + selected_id);
      if (input_element) {
        input_element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
        element.querySelector(".operation").style.display = "grid";
        element.querySelector(".select-pledge-radio").checked = true;
        element.querySelector(".operation input").value = "0";
      } else {
        element.querySelector(".operation").style.display = "none";
        element.querySelector(".select-pledge-radio").checked = false;
        element.querySelector(".operation input").value = "";
      }
    });
  };
  document.querySelectorAll(".select-pledge-radio").forEach((element, key) => {
    element.addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        selected_pledge = event.currentTarget;
        select_pledge(element.attributes.id.value);
      }
    });
  });

  document.querySelectorAll(".select-pledge-item ").forEach((element, key) => {
    element.querySelector(".operation a").addEventListener("click", (event) => {
      event.preventDefault();
      var amount = parseFloat(element.querySelector(".operation input").value);
      if (amount <= 0) {
        return;
      }
      select_pledge("none");
      update_back_information(amount);
      is_show_success_modal(true);
      is_show_select_pledge_modal(false);
    });
  });

  var is_show_success_modal = (is_show) => {
    document.querySelector("#success-modal").style.display = is_show
      ? "block"
      : "none";
  };

  var is_show_select_pledge_modal = (is_show) => {
    var body_height = document.querySelector("body").offsetHeight;
    document.querySelector("#pledge-modal").style.height =
      "" + body_height + "px";
    document.querySelector("#pledge-modal").style.display = is_show
      ? "block"
      : "none";
  };

  document
    .querySelector("#success-modal-close")
    .addEventListener("click", (event) => {
      event.preventDefault();
      is_show_success_modal(false);
    });

});
