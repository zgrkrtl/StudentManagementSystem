//There are couple console.log() to keep track of the some situations

//Score class is the class that keeps the scores of students distinctly by course
class Score {
  constructor(courseId, midterm, final) {
    this.courseId = courseId;
    this.midterm = midterm;
    this.final = final;
  }

  getCourseId() {
    return this.courseId;
  }

  getMidtermScore() {
    return this.midterm;
  }

  getFinalScore() {
    return this.final;
  }
}
//Course Class defines the course by id name grading scale and keeps the students that enrolled to that course
class Course {
  constructor(courseId, courseName, gradingScale) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.gradingScale = gradingScale;
    this.students = []; // Array to store students enrolled in the course
  }
  enrollStudent(student) {
    this.students.push(student);
  }

  getCourseId() {
    return this.courseId;
  }
  getCourseName() {
    return this.courseName;
  }

  getStudents() {
    return this.students;
  }
  getGradingScale() {
    return this.gradingScale;
  }
}
//student class defined as  student id name and surname and keeps courses that student object has enrolled
//and keeps scores list the list of score objects of student
class Student {
  constructor(id, name, surname) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.courses = []; // List to store students enrolled courses
    this.scores = []; // List that scores kept
  }
  //Calculate grade of the specific course that student has by getting courseId
  calculateGrade(courseId) {
    const selectedGrade = this.scores.find(
      (grade) => grade.getCourseId() === parseInt(courseId)
    );
    const selectedCourse = this.courses.find(
      (course) => course.getCourseId() === parseInt(courseId)
    );
    console.log(selectedGrade);
    const midtermScore = selectedGrade.midterm;
    const finalScore = selectedGrade.final || 0;

    const midtermWeight = 0.4;
    const finalWeight = 0.6;

    let totalScore = midtermScore * midtermWeight + finalScore * finalWeight;

    // Adjust totalScore based on grading scale
    if (selectedCourse.getGradingScale() === 7) {
      totalScore = (totalScore / 100) * 70;
    } else {
      totalScore = (totalScore / 100) * 100;
    }

    let LetterGrade;
    // Determine the grade based on the total score
    if (totalScore >= 90) {
      LetterGrade = "AA";
    } else if (totalScore >= 75) {
      LetterGrade = "BA";
    } else if (totalScore >= 65) {
      LetterGrade = "BB";
    } else if (totalScore >= 60) {
      LetterGrade = "CB";
    } else if (totalScore >= 55) {
      LetterGrade = "CC";
    } else if (totalScore >= 50) {
      LetterGrade = "DC";
    } else if (totalScore >= 40) {
      LetterGrade = "DD";
    } else {
      LetterGrade = "FF";
    }

    return LetterGrade;
  }
  //enrolling course to this.student object
  enrollCourse(course, midtermScore, finalScore) {
    this.courses.push(course);
    const courseId = course.getCourseId();
    this.scores.push(new Score(courseId, midtermScore, finalScore));
    console.log(this.scores);
  }
  //getters and setters ,needed ones only
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
  }
  getCourses() {
    return this.courses;
  }

  getMidterm(courseId) {
    console.log(this.scores);
    const selectedGrade = this.scores.find(
      (grade) => parseInt(grade.getCourseId()) === parseInt(courseId)
    );
    console.log(selectedGrade);
    return selectedGrade.midterm;
  }

  getFinal(courseId) {
    const selectedGrade = this.scores.find(
      (grade) => parseInt(grade.getCourseId()) === parseInt(courseId)
    );

    return selectedGrade.getFinalScore();
  }
}
//Started point of the webpage there are 2 courses initially and
//3 students
const courses = [
  new Course(1, "Web Development", "10 point Scale"),
  new Course(2, "Database Design", "7 point Scale"),
];

const students = [
  new Student(1, "John", "Doe"),
  new Student(2, "Alice", "Smith"),
  new Student(3, "Alex", "Fury"),
];
// and only Alice Smith is enrolled to two courses firstly
students[1].enrollCourse(courses[0], 25, 45);
courses[0].enrollStudent(students[1]);
students[1].enrollCourse(courses[1], 66, 67);
courses[1].enrollStudent(students[1]);

// Populate course select dropdown when a course added
const courseSelect = document.getElementById("courseSelect");
courses.forEach((course) => {
  const option = document.createElement("option");
  option.value = course.getCourseId();
  option.textContent = course.getCourseName();
  courseSelect.appendChild(option);
});

// adding a course
document
  .getElementById("addCourseBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value;
    const gradingScale = document.getElementById("gradingScale").value;

    const newCourse = new Course(courses.length + 1, courseName, gradingScale);
    courses.push(newCourse);

    // Add the newly added course to the dropdown
    const option = document.createElement("option");
    option.value = newCourse.getCourseId();
    option.textContent = newCourse.getCourseName();

    courseSelect.appendChild(option);

    // Clear forms
    document.getElementById("courseName").value = "";
    document.getElementById("gradingScale").value = "10";
  });
//list courses
document
  .getElementById("listCoursesBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const CoursesTable = document.getElementById("CoursesTable");
    CoursesTable.innerHTML = `<tr>
    <th>CourseID</th>
    <th>CourseName</th>

  </tr>`;
    courses.forEach((course) => {
      const row = `
      <tr>
        <td>${course.getCourseId()}</td>
        <td>${course.getCourseName()}</td>
      </tr>
    `;
      CoursesTable.innerHTML += row;
    });
  });
// List students by course id

document
  .getElementById("viewStudentScoresBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const selectedCourseId = document.getElementById("viewStudentScores").value;
    const studentScoresTable = document.getElementById("studentScoresTable");
    studentScoresTable.innerHTML = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Surname</th>
    <th>Midterm</th>
    <th>Final</th>
    <th>Grade</th>


    </tr>`;

    const selectedCourse = courses.find(
      (course) => course.courseId === parseInt(selectedCourseId)
    );
    const studentsList = selectedCourse.getStudents();
    console.log(selectedCourse);
    studentsList.forEach((student) => {
      console.log(student);
      const row = `
      <tr>
        <td>${student.getId()}</td>
        <td>${student.getName()}</td>
        <td>${student.getSurname()}</td>
        <td>${student.getMidterm(selectedCourse.getCourseId())}</td>
        <td>${student.getFinal(selectedCourse.getCourseId())}</td>
        <td>${student.calculateGrade(selectedCourse.getCourseId())}</td>

      </tr>
    `;
      studentScoresTable.innerHTML += row;
    });
  });
//Enroll Existing Student To course
document
  .getElementById("enrollStudentBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // handle if fail
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = "";
    const failureMessage = document.getElementById("failureMessage");
    failureMessage.textContent = "";
    const studentID = parseInt(document.getElementById("studentID").value);
    const midtermScore = parseInt(
      document.getElementById("midtermScore").value
    );
    const finalScore = parseInt(document.getElementById("finalScore").value);

    function validateInput(studentID, midtermScore, finalScore) {
      const isValidStudentID =
        Number.isInteger(studentID) && studentID >= 0 && studentID <= 999;
      const isValidMidtermScore =
        Number.isInteger(midtermScore) &&
        midtermScore >= 0 &&
        midtermScore <= 100;
      const isValidFinalScore =
        Number.isInteger(finalScore) && finalScore >= 0 && finalScore <= 100;

      return isValidStudentID && isValidMidtermScore && isValidFinalScore;
    }

    const isValid = validateInput(studentID, midtermScore, finalScore);
    const SelectedStudentID = document.getElementById("studentID").value;
    let isNotAlreadyEnrolled = true;

    const courseSelection = document.getElementById("courseSelect").value;
    const courseSelected = courses.find(
      (course) => course.getCourseId() === parseInt(courseSelection)
    );

    courseSelected.getStudents().forEach((student) => {
      if (parseInt(SelectedStudentID) === student.getId()) {
        console.log(SelectedStudentID);
        console.log(student.getId());
        isNotAlreadyEnrolled = false;
      }
    });
    console.log(isNotAlreadyEnrolled);
    if (isValid && isNotAlreadyEnrolled) {
      // Perform form submission if input is valid

      const selectedStudent = students.find(
        (student) => student.getId() === parseInt(SelectedStudentID)
      );

      selectedStudent.enrollCourse(courseSelected, midtermScore, finalScore);
      courseSelected.enrollStudent(selectedStudent);
      successMessage.textContent = "Successfully enrolled.";
    } else {
      failureMessage.textContent =
        "Invalid input ! (Student id 1-999 & Scores 0-100) OR Student Already Enrolled !";
    }
    //clear forms
    document.getElementById("studentID").value = "";
    document.getElementById("midtermScore").value = "";
    document.getElementById("finalScore").value = "";
  });

//List Students
document
  .getElementById("viewStudentsBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const studentsTable = document.getElementById("viewStudentsTable");
    studentsTable.innerHTML = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Surname</th>

    </tr>`;

    students.forEach((student) => {
      const row = `
      <tr>
        <td>${student.getId()}</td>
        <td>${student.getName()}</td>
        <td>${student.getSurname()}</td>

      </tr>
    `;
      studentsTable.innerHTML += row;
    });
  });
//Add a Student
document
  .getElementById("addStudentBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const successMessage = document.getElementById("successMessage2");
    successMessage.textContent = "";
    const failureMessage = document.getElementById("failureMessage2");
    failureMessage.textContent = "";
    const studentID = parseInt(
      document.getElementById("studentIDAddStudent").value
    );
    const studentFirstName = document.getElementById("firstName").value;
    const studentLastName = document.getElementById("lastName").value;

    function doesntExist() {
      let boolean = true;
      students.forEach((student) => {
        if (parseInt(student.getId()) === studentID) {
          console.log(parseInt(student.getId()) === studentID);
          boolean = false;
        }
      });
      return boolean;
    }

    function validateInput() {
      const doesNotExist = doesntExist();
      console.log(doesNotExist);
      const isValidStudentID =
        Number.isInteger(studentID) &&
        studentID >= 0 &&
        studentID <= 999 &&
        doesNotExist;

      const isVAlidStudentFirstName = studentFirstName.length < 15;
      const isVAlidStudentLastName = studentLastName.length < 15;

      let allValid =
        isVAlidStudentFirstName && isVAlidStudentLastName && isValidStudentID;

      return allValid;
    }
    const isValidStd = validateInput();

    if (isValidStd) {
      students.push(
        new Student(parseInt(studentID), studentFirstName, studentLastName)
      );
      successMessage.textContent = "Successfully Added.";
    } else {
      failureMessage.textContent =
        "Invalid input ! (Student id 1-999 ) OR Student Already Exists !";
    }
    //clear forms
    document.getElementById("studentIDAddStudent").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
  });
/*function x(e, name) {
  // const std = JSON.parse(student);
  const sName = "mid-" + name;
  const y = document.getElementById(sName);
  // textContent = e;
  const selectedStd = students.find((student) => student.getName() === name);
  const selectedCrs = courses.find((course) => course.getCourseName() === e);
  console.log(selectedCrs, "-----");
  // console.log(selectedStd);

  const midterm = selectedStd.getMidterm(selectedCrs);
  // console.log(midterm);
  console.log(e, midterm);
  y.textContent = midterm;
}
*/

//Calculating GPA function to be used in search-students event handler
function calculateGPA(student) {
  const courses = student.getCourses();
  const LetterGrades = [];
  courses.forEach((course) => {
    const courseId = course.getCourseId();
    const LetterGrade = student.calculateGrade(courseId);
    LetterGrades.push(LetterGrade);
  });
  const gradePoints = {
    AA: 4.0,
    BA: 3.5,
    BB: 3.0,
    CB: 2.5,
    CC: 2.0,
    DC: 1.5,
    DD: 1.0,
    FD: 0.5,
    FF: 0.0,
  };
  let sum = 0;
  let count = 0;
  for (const grade of LetterGrades) {
    console.log(gradePoints[grade]);
    count += 1;
    sum += gradePoints[grade];
  }
  const gpa = sum / count;
  if (gpa) {
    return gpa;
  } else {
    return 0;
  }
}
//Search Students
document
  .getElementById("searchStudentsBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const searchValue = document.getElementById("searchStudentName2").value;
    const studentsTable = document.getElementById("SearchStudentsTable");
    studentsTable.innerHTML = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Surname</th>
    <th>GPA</th>  

    </tr>`;

    students.forEach((student) => {
      if (student.getName().toLowerCase().includes(searchValue.toLowerCase())) {
        // The search text is found in the name
        const row = `
      <tr>
        <td>${student.getId()}</td>
        <td>${student.getName()}</td>
        <td>${student.getSurname()}</td>
        <td>${calculateGPA(student)}</td>
          
    `;
        studentsTable.innerHTML += row;
      }
    });
  });
