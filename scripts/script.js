document.addEventListener("DOMContentLoaded", function () {
  // Кнопка для перехода на страницу с вкладками
  const showAllCharactersBtn = document.getElementById(
    "show-all-characters-btn"
  );
  const mainSection = document.getElementById("main-section");

  showAllCharactersBtn.addEventListener("click", function () {
    mainSection.classList.toggle("active");
  });

  // Кнопка для перехода на страницу со студентами
  const showStudentsBtn = document.getElementById("show-students-btn");
  showStudentsBtn.addEventListener("click", function () {
    window.location.href = "./lauots/students.html";
  });

  // Кнопка для перехода на страницу с сотрудниками
  const showStaffBtn = document.getElementById("show-staff-btn");
  showStaffBtn.addEventListener("click", function () {
    window.location.href = "./lauots/staff.html";
  });

  // Кнопка для перехода на страницу с персонажами
  const showCharactersBtn = document.getElementById("show-characters-btn");
  showCharactersBtn.addEventListener("click", function () {
    window.location.href = "./lauots/characters.html";
  });
});
