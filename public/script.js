//! -------------------------

//* Used an Arr
const hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

document.addEventListener("DOMContentLoaded", function () {
  const curDate = dayjs().format("dddd, MMMM, YYYY");
  const curHour = dayjs().hour();

  $("#currentDay").text(`${curDate}`);

  // Get the time base on current hour (past, present, future)
  const time = (h) =>
    curHour < h ? "future" : curHour > h ? "past" : "present";

  const deleteIcon = (str) =>
    Object.keys(localStorage).includes(str) ? "" : "hidden";

  hoursArray.forEach((h) => {
    //! Time block
    $("<div/>", {
      id: `hour-${h}`,
      class: `row time-block ${time(h)}`,
    }).appendTo("#time-block-container");

    //! hr txt
    $("<div/>", {
      id: `text-center-${h}`,
      class: "col-2 col-md-1 hour text-center py-3",
    }).appendTo(`#hour-${h}`);

    $("<p/>", {
      text: `${h}:00`,
    }).appendTo(`#text-center-${h}`);

    //! delete icon
    $("<i/>", {
      class: `delete-icon fas fa-trash ${deleteIcon(`hour-${h}`)}`,
      click: () => {
        clearSpecPlan(`hour-${h}`);
      },
    })
      .attr("aria-hidden", "true")
      .appendTo(`#text-center-${h}`);

    //! textarea
    $("<textarea/>", {
      class: "col-8 col-md-10 description future",
    })
      .attr("rows", "3")
      .appendTo(`#hour-${h}`);

    //^ sveBTN
    $("<button/>", {
      id: `saveBtn-${h}`,
      class: "btn saveBtn col-2 col-md-1",
    })
      .attr("aria-label", "save")
      .appendTo(`#hour-${h}`);

    //^ sveIcon
    $("<i/>", {
      class: "fas fa-save",
    })
      .attr("aria-hidden", "true")
      .appendTo(`#saveBtn-${h}`);
  });

  //! clear all
  $("<button/>", {
    id: `clear-all`,
    class: "btn btn-danger",
    text: "Clear all",
    click: (e) => {
      clearPlans(e);
    },
  }).appendTo(`.btn-container`);

  const saveDayPlan = () => {
    // Get all button elements by class
    const saveBtns = $(".saveBtn");
    // Add a click event listener to each save button
    saveBtns.on("click", function (e) {
      // The `this` keyword refers to the element that was clicked
      const saveBtns = $(this);
      // Find the time-block element that contains the save button
      const timeBlock = saveBtns.closest(".time-block");
      // Get the id of the time-block element (e.g. "hour-9")
      const id = timeBlock.attr("id");
      // Get the value of the description input field
      const description = timeBlock.find(".description").val();
      console.log(description.length);
      if (description.length === 0 || description === "") {
        alert("There is nothing to save!");
        return;
      }
      // Save the description in local storage with key is id
      localStorage.setItem(id, JSON.stringify(description));
      // Show delete icon after add data
      $(`#${id} .text-center .delete-icon`).removeClass("hidden");
    });
  };

  const getDayPlan = () => {
    $(".time-block").each(function () {
      let id = $(this).attr("id");
      let data = localStorage.getItem(id);
      if (data) {
        $(this).find(".description").val(JSON.parse(data));
      }
    });
  };

  const clearSpecPlan = (key) => {
    // Alert to confirm user action
    const confirm = window.confirm("You sure you want to clear your plan?");

    if (confirm) {
      // Clear local storage by key
      localStorage.removeItem(key);
      $(`#${key} .description`).val("");
      $(`#${key} .text-center .delete-icon`).addClass("hidden");
    }
  };

  const clearPlans = (e) => {
    if (localStorage.length === 0) {
      window.alert("You have nothing there !");
      return;
    }

    // Alert to confirm user action
    const confirm = window.confirm("Your sure you want to clear all your plans?");

    if (confirm) {
      // Clearing all storage
      localStorage.clear();
      $(".time-block .description").val("");
      $(`.time-block .text-center .delete-icon`).addClass("hidden");
    }
  };

  saveDayPlan();
  getDayPlan();
});

//! -------------------------

//^-------------------------vanilla JavaScript
  //* I don't like jQuery lol, but it's useful...
//^___________________________________
