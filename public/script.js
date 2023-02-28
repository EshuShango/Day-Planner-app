//! -------------------------

const hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

document.addEventListener("DOMContentLoaded", function () {
  const curDate = dayjs().format("dddd, MMMM, YYYY");
  const curHour = dayjs().hour();

  $("#currentDay").text(`${curDate}`);

  // Get the time base on current hour (past, present, future)
  const time = (h) => curHour < h ? "future" : curHour > h ? "past" : "present";

  const deleteIcon = (str) => Object.keys(localStorage).includes(str) ? "" : "hidden";

  // Create time block content element depend on business hours
  hoursArray.forEach((h) => {
    // Time block
    $("<div/>", {
      id: `hour-${h}`,
      class: `row time-block ${time(h)}`,
    }).appendTo("#time-block-container");

    // hr txt
    $("<div/>", {
      id: `text-center-${h}`,
      class: "col-2 col-md-1 hour text-center py-3",
    }).appendTo(`#hour-${h}`);

    $("<p/>", {
      text: `${h}:00`,
    }).appendTo(`#text-center-${h}`);

    // delete icon
    $("<i/>", {
      class: `delete-icon fas fa-trash ${deleteIcon(`hour-${h}`)}`,
      click: () => {
        clearSpecPlan(`hour-${h}`);
      },
    })
      .attr("aria-hidden", "true")
      .appendTo(`#text-center-${h}`);

    // textarea
    $("<textarea/>", {
      class: "col-8 col-md-10 description",
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
        alert("There is no data to save!");
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
    const confirm = window.confirm("Are you sure to clear this data?");

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
    const confirm = window.confirm("Are you sure to clear all data?");

    if (confirm) {
      // Clear all storage
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
// const businessHoursArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// document.addEventListener("DOMContentLoaded", function () {

//   const curDate = dayjs().format("dddd, MMMM, YYYY");
//   const curHour = dayjs().hour();
  
//   document.getElementById("currentDay").textContent = curDate;

//   //^ Getting the time based on the current hour (past, present, future)
//   const getTime = (h) =>
//     curHour < h ? "future" : curHour > h ? "past" : "present";

//   const showHideDeleteIcon = (str) => {
//     const storageKeys = Object.keys(localStorage);
//     return storageKeys.includes(str) ? "" : "hidden";
//   };

//    // Create time block content element depend on business hours
//    businessHoursArr.forEach((h) => {
//     // Time block
//     const timeBlock = document.createElement("div");
//     timeBlock.setAttribute("id", `hour-${h}`);
//     timeBlock.setAttribute("class", `row time-block ${getTime(h)}`);
//     document.getElementById("time-block-container").appendChild(timeBlock);

//     // Create business hour text
//     const hourText = document.createElement("div");
//     hourText.setAttribute("id", `text-center-${h}`);
//     hourText.setAttribute("class", "col-2 col-md-1 hour text-center py-3");
//     timeBlock.appendChild(hourText);

//     const hourTextP = document.createElement("p");
//     hourTextP.textContent = `${h}:00`;
//     hourText.appendChild(hourTextP);

//     // Create delete icon
//     const deleteIcon = document.createElement("i");
//     deleteIcon.setAttribute("class", `delete-icon fas fa-trash ${showHideDeleteIcon(`hour-${h}`)}`);
//     deleteIcon.setAttribute("aria-hidden", "true");
//     deleteIcon.addEventListener("click", () => clearSpecificWorkPlan(`hour-${h}`));
//     hourText.appendChild(deleteIcon);

//     // Create textarea
//     const descriptionTextArea = document.createElement("textarea");
//     descriptionTextArea.setAttribute("class", "col-8 col-md-10 description");
//     descriptionTextArea.setAttribute("rows", "3");
//     timeBlock.appendChild(descriptionTextArea);

//     // Create save button
//     const saveButton = document.createElement("button");
//     saveButton.setAttribute("id", `saveBtn-${h}`);
//     saveButton.setAttribute("class", "btn saveBtn col-2 col-md-1");
//     saveButton.setAttribute("aria-label", "save");
//     timeBlock.appendChild(saveButton);

//     // Create save icon
//     const saveIcon = document.createElement("i");
//     saveIcon.setAttribute("class", "fas fa-save");
//     saveIcon.setAttribute("aria-hidden", "true");
//     saveButton.appendChild(saveIcon);
//     saveButton.addEventListener("click", function (e) {
//       const timeBlock = this.closest(".time-block");
//       const id = timeBlock.getAttribute("id");
//       const description = timeBlock.querySelector(".description").value;
//       if (!description || description.length === 0) {
//         alert("There is no data to save!");
//         return;
//       }
//       localStorage.setItem(id, JSON.stringify(description));
//       document.querySelector(`#${id} .text-center .delete-icon`).classList.remove("hidden");
//     });
//   });

//   const clearSpecificWorkPlan = (key) => {
//     const confirm = window.confirm("Are you sure to clear this data?");
//     if (confirm) {
//       localStorage.removeItem(key);
//       document.querySelector(`#${key} .description`).value = "";
//       document.querySelector(`#${key} .text-center .delete-icon`).classList.add("hidden");
//     }
 
//   };

//   // Clear all the work plan in local storage
//   const clearAllWorkPlans = (e) => {
//     // Check if local storage has data
//     if (localStorage.length === 0) {
//       window.alert("There is no data!");
//       return;
//     }

//     // Show a browser alert to confirm user action
// const confirmClear = confirm("Are you sure to clear all data?");
// if (confirmClear) {
//   localStorage.clear();
//   document.querySelectorAll(".time-block .description").forEach((el) => {
//     el.value = "";
//   });
//   document.querySelectorAll(".time-block .text-center .delete-icon").forEach((el) => {
//     el.classList.add("hidden");
//   });
// }
//   saveWorkPlanData();
//   retrieveWorkPlanData();
// });
//^___________________________________



