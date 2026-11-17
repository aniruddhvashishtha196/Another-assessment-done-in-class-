import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending" },
  { id: 2, taskName: "Design Dashboard", assignedTo: "Priya Verma", status: "In Progress" },
  { id: 3, taskName: "Test REST API", assignedTo: "Amit Kumar", status: "Completed" }
];

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error("Request body must be valid JSON.")); }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const route = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;

  if (req.method === "GET" && route === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end("<h1>Employee Task Management</h1><p>HTTP server is running.</p>");
  }

  if (req.method === "GET" && route === "/tasks") return sendJson(res, 200, tasks);

  if (req.method === "POST" && route === "/add-task") {
    try {
      const task = await readBody(req);
      if (["id", "taskName", "assignedTo", "status"].some(k => task[k] === undefined || String(task[k]).trim() === "")) {
        return sendJson(res, 400, { message: "Required fields: id, taskName, assignedTo, status." });
      }
      if (tasks.some(t => t.id === task.id)) return sendJson(res, 409, { message: "Task ID already exists." });
      tasks.push(task);
      return sendJson(res, 201, { message: "Task added successfully", task });
    } catch (error) {
      return sendJson(res, 400, { message: error.message });
    }
  }

  if (req.method === "GET" && route === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end("<h1>About</h1><p>Employee Task Management using Node.js HTTP and FS modules.</p>");
  }

  if (req.method === "GET" && route === "/home") {
    return fs.readFile(path.join(__dirname, "public", "index.html"), "utf8", (err, html) => {
      if (err) return sendJson(res, 500, { message: "Could not load home page." });
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
  }

  return sendJson(res, 404, { message: "Route not found." });
});

server.listen(PORT, () => console.log(`HTTP Server running at http://localhost:${PORT}`));
