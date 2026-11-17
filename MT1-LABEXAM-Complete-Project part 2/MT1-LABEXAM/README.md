# MT1-LABEXAM — Employee Task Management

A Node.js lab project using the built-in HTTP and FS modules and Express.js CRUD APIs. Data is stored in JavaScript arrays (no database).

## Project structure

```text
MT1-LABEXAM/
├── package.json
├── httpServer.js
├── expressApp.js
├── public/
│   └── index.html
├── screenshots/
│   └── README.md
└── README.md
```

## Requirements
- Node.js 18 or later
- npm

## Install
Open this folder in VS Code and run:

```bash
npm install
```

## Part A: HTTP + FS server (port 3000)

```bash
npm run start:http
```

Open `http://localhost:3000/`, `/tasks`, `/about`, or `/home`.

POST endpoint: `http://localhost:3000/add-task`  
Select raw JSON in your API client:

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending"
}
```

## Part B: Express REST API (port 4000)

Open a second terminal:

```bash
npm run start:express
```

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/1` | Get task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/1` | Update a task |
| DELETE | `/tasks/1` | Delete a task |

Sample POST JSON:

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```

Sample PUT JSON:

```json
{
  "status": "Completed",
  "priority": "High"
}
```

Use Postman, EchoAPI, or Thunder Client. For POST and PUT choose Body → raw → JSON.

## Screenshots for submission
Add your own screenshots inside `screenshots/`:
1. HTTP server running in terminal.
2. Browser outputs for `/`, `/tasks`, `/about`, and `/home`.
3. Express server running in terminal.
4. EchoAPI/Postman results for GET all, GET by ID, POST, PUT, and DELETE.
5. GitHub repository and commit history.

## Push to GitHub

Create a repository named `MT1-LABEXAM`, then run (replace YOUR-USERNAME):

```bash
git init
git add .
git commit -m "Initial employee task management project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
git push -u origin main
```
