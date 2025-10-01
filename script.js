const students = [
  { id: 1, name: "Aarav Patel", roll: "S1001", class: "10", section: "A", dob: "2009-02-21", phone: "9876543210", email: "aarav@example.com" },
  { id: 2, name: "Maya Sharma", roll: "S1002", class: "10", section: "B", dob: "2009-05-12", phone: "9123456780", email: "maya@example.com" },
];

const tableBody = document.querySelector("#studentTable tbody");
const modal = document.getElementById("modal");
const form = document.getElementById("studentForm");
const modalTitle = document.getElementById("modalTitle");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

function renderTable() {
  tableBody.innerHTML = "";
  students.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.roll}</td>
      <td>${s.class}</td>
      <td>${s.section}</td>
      <td>${s.dob}</td>
      <td>${s.phone}</td>
      <td>${s.email}</td>
      <td>
        <button class="action" onclick="editStudent(${s.id})">Edit</button>
        <button class="action" onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function openModal(edit = null) {
  modal.classList.remove("hidden");
  if (edit) {
    modalTitle.textContent = "Edit Student";
    document.getElementById("studentId").value = edit.id;
    document.getElementById("name").value = edit.name;
    document.getElementById("roll").value = edit.roll;
    document.getElementById("class").value = edit.class;
    document.getElementById("section").value = edit.section;
    document.getElementById("dob").value = edit.dob;
    document.getElementById("phone").value = edit.phone;
    document.getElementById("email").value = edit.email;
  } else {
    modalTitle.textContent = "Add Student";
    form.reset();
    document.getElementById("studentId").value = "";
  }
}

function closeModal() {
  modal.classList.add("hidden");
}

function addStudent(student) {
  student.id = Date.now();
  students.push(student);
  renderTable();
}

function updateStudent(student) {
  const index = students.findIndex(s => s.id == student.id);
  students[index] = student;
  renderTable();
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  openModal(student);
}

function deleteStudent(id) {
  const index = students.findIndex(s => s.id === id);
  students.splice(index, 1);
  renderTable();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const student = {
    id: document.getElementById("studentId").value,
    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    class: document.getElementById("class").value,
    section: document.getElementById("section").value,
    dob: document.getElementById("dob").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
  };
  if (student.id) updateStudent(student);
  else addStudent(student);
  closeModal();
});

addBtn.addEventListener("click", () => openModal());
cancelBtn.addEventListener("click", closeModal);

renderTable();
