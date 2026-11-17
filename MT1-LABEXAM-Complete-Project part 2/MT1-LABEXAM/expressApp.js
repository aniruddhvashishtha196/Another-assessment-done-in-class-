import express from "express";

const app = express();
const PORT = 4000;
app.use(express.json());

let tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending", priority: "High" },
  { id: 2, taskName: "Design Dashboard", assignedTo: "Priya Verma", status: "In Progress", priority: "Medium" },
  { id: 3, taskName: "Test REST API", assignedTo: "Amit Kumar", status: "Completed", priority: "Low" }
];

app.get("/", (req, res) => res.json({ message: "Employee Task Management REST API" }));

app.get("/tasks", (req, res) => res.status(200).json(tasks));

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found." });
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body || {};
  if ([id, taskName, assignedTo, status, priority].some(v => v === undefined || String(v).trim() === "")) {
    return res.status(400).json({ message: "Required fields: id, taskName, assignedTo, status, priority." });
  }
  if (tasks.some(t => t.id === Number(id))) return res.status(409).json({ message: "Task ID already exists." });
  const task = { id: Number(id), taskName, assignedTo, status, priority };
  tasks.push(task);
  res.status(201).json({ message: "Task added successfully", task });
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found." });
  const allowed = ["taskName", "assignedTo", "status", "priority"];
  const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([k, v]) =>
    allowed.includes(k) && v !== undefined && v !== null && String(v).trim() !== ""));
  if (!Object.keys(updates).length) return res.status(400).json({ message: "Provide fields to update." });
  Object.assign(task, updates);
  res.json({ message: "Task updated successfully", task });
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index < 0) return res.status(404).json({ message: "Task not found." });
  const [deleted] = tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully", task: deleted });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) return res.status(400).json({ message: "Invalid JSON body." });
  next(err);
});
app.use((req, res) => res.status(404).json({ message: "Route not found." }));

app.listen(PORT, () => console.log(`Express Server running at http://localhost:${PORT}`));
