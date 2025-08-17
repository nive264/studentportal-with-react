import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", grade: "A", department: "Computer Science" },
    { id: 2, name: "Jane Smith", grade: "B", department: "Mathematics" },
    { id: 3, name: "Alice Johnson", grade: "C", department: "Physics" },
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [newDept, setNewDept] = useState("");

  const filteredStudents = students
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "grade") return a.grade.localeCompare(b.grade);
      if (sortBy === "department")
        return a.department.localeCompare(b.department);
      return 0;
    });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newGrade.trim() || !newDept.trim()) {
      alert("Please enter all fields!");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: newName,
      grade: newGrade.toUpperCase(),
      department: newDept,
    };
    setStudents([...students, newStudent]);
    setNewName("");
    setNewGrade("");
    setNewDept("");
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <h1>📚 Student Directory</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="grade">Sort by Grade</option>
          <option value="department">Sort by Department</option>
        </select>
      </div>

      <form className="add-form" onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade (A, B, C...)"
          value={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
        />
        <button type="submit">➕ Add Student</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.department}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
