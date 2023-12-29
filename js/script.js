class Course {
  constructor(courseId, courseName, gradingScale) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.gradingScale = gradingScale;
    this.students = []; // Array to store students enrolled in the course
  }
  enrollStudent(student, midtermScore, finalScore) {
    this.students.push(student);
    student.setMidterm(midtermScore);
    student.setFinal(finalScore);
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
class Student {
  constructor(id, name, surname) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.courses = []; // Array to store student's enrolled courses
    this.scores = {
      midterm: {}, // Object to store midterm scores for courses
      final: {}, // Object to store final scores for courses
    };
  }
  calculateGrade(course) {
    const midtermScore = this.scores.midterm[course] || 0;
    const finalScore = this.scores.final[course] || 0;

    const midtermWeight = 0.4;
    const finalWeight = 0.6;

    let totalScore = midtermScore * midtermWeight + finalScore * finalWeight;

    // Adjust totalScore based on grading scale
    if (course.getGradingScale() === 7) {
      totalScore = (totalScore / 100) * 70;
    } else {
      totalScore = (totalScore / 100) * 100;
    }

    let grade;
    // Determine the grade based on the total score
    if (totalScore >= 90) {
      grade = "AA";
    } else if (totalScore >= 75) {
      grade = "BA";
    } else if (totalScore >= 65) {
      grade = "BB";
    } else if (totalScore >= 60) {
      grade = "CB";
    } else if (totalScore >= 55) {
      grade = "CC";
    } else if (totalScore >= 50) {
      grade = "DC";
    } else if (totalScore >= 40) {
      grade = "DD";
    } else {
      grade = "FF"; // Failing grade
    }

    return grade;
  }
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
  enrollCourse(course) {
    this.courses.push(course);
  }
  setMidterm(course, value) {
    this.scores.midterm[course] = value;
  }

  setFinal(course, value) {
    this.scores.final[course] = value;
  }

  getMidterm(course) {
    return this.scores.midterm[course];
  }

  getFinal(course) {
    return this.scores.final[course];
  }
}

const courses = [
  new Course(1, "Web Development", "10 point Scale"),
  new Course(2, "Database Design", "7 point Scale"),
  // Add more courses here...
];

const students = [
  new Student(1, "John", "Doe"),
  new Student(2, "Alice", "Smith"),
  new Student(3, "Alex", "Fury"),
];
courses[0].enrollStudent(students[0]);
courses[0].enrollStudent(students[1]);
students[0].setMidterm(courses[0], 50);
students[0].setFinal(courses[0], 75);
students[1].setMidterm(courses[0], 50);
students[1].setFinal(courses[0], 60);

courses[1].enrollStudent(students[1]);

// Populate course select dropdown
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
    option.textContent = newCourse.getCourseName(); // Fixed function call

    courseSelect.appendChild(option);

    // Clear form fields
    document.getElementById("courseName").value = "";
    document.getElementById("gradingScale").value = "10";
  });
//List Courses
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
    // List students by course id
  });
//Enroll Existing Student To course
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
    console.log(courses);
    const selectedCourse = courses.find(
      (course) => course.courseId === parseInt(selectedCourseId)
    );
    const studentsList = selectedCourse.students;
    console.log(studentsList);
    studentsList.forEach((student) => {
      const row = `
      <tr>
        <td>${student.getId()}</td>
        <td>${student.getName()}</td>
        <td>${student.getSurname()}</td>
        <td>${student.getMidterm(selectedCourse)}</td>
        <td>${student.getFinal(selectedCourse)}</td>
        <td>${student.calculateGrade(selectedCourse)}</td>
        
      </tr>
    `;
      studentScoresTable.innerHTML += row;
    });
  });
document
  .getElementById("enrollStudentBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // fail handle
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

      courseSelected.enrollStudent(selectedStudent, midtermScore, finalScore);

      successMessage.textContent = "Successfully enrolled.";
      selectedStudent.enrollCourse(courseSelected);
      selectedStudent.setMidterm(courseSelected, midtermScore);
      selectedStudent.setFinal(courseSelected, finalScore);
    } else {
      failureMessage.textContent =
        "Invalid input ! (Student id 1-999 & Scores 0-100) OR Student Already Enrolled !";
    }
    //clear forms
    document.getElementById("studentID").value = "";
    document.getElementById("midtermScore").value = "";
    document.getElementById("finalScore").value = "";
    //actions of Enrolling student
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
document
  .getElementById("addStudentBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
