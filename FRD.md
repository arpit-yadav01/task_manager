FRD – Project & Task Manager
What this is

This is a small internal tool where a user can log in, create projects, and manage tasks inside those projects. Everything is user-specific, so one user cannot see another user’s data.

The idea is to keep it simple and focused only on basic task tracking.


Features
User can sign up and log in
After login, user lands on projects page
User can create a project
User can see list of their projects
User can open a project
Inside a project, user can add tasks
Each task has a status (Todo, In Progress, Done)
User can update task status
User can delete tasks
User can log out


User Flow

User opens the app
If not logged in → sees login page
User logs in or registers
After login → goes to projects page
On projects page →
User can create a project
User can click a project
On project click → goes to tasks page
On tasks page →
User adds tasks
User updates task status
User deletes tasks
User can log out → goes back to login


Validations

Email and password are required
Password should not be empty
Project name should not be empty
Task name should not be empty
User must be logged in to access any data
A user should only access their own projects and tasks


Assumptions

No team feature, single user only
One project belongs to one user
One task belongs to one project
Status is fixed (Todo, In Progress, Done)
No file upload or attachments
No pagination since data is small
Auth handled using JWT cookies


Notes

UI is kept simple
Focus is on functionality, not design
APIs are structured and reusable
Basic error handling is implemented