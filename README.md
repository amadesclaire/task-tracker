# Task Tracker CLI

Task Tracker is a command-line tool (CLI) to manage your daily tasks. You can add, update, delete, and list tasks, and mark them as "in progress" or "done". Task Tracker stores your tasks in a local `tasks.json` file.

## Features

- Add a task with a description.
- Update an existing task.
- Delete a task.
- List all tasks or filter by status (e.g., "done", "in progress").
- Mark tasks as "in progress" or "done".
- Cross-platform compatibility with Deno.

## Requirements

- [Deno](https://deno.land/) (v1.28.0 or higher)

## Quickstart

1. **Install Deno**

   Follow the official instructions to install Deno on your system: [Install Deno](https://deno.land/#installation)

2. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

3. **Compile into an Executable**

   To compile the script into a standalone executable:

   ```bash
   deno task compile
   ```

   This will compile an executable for your machine that you can run directly in the terminal.

   **Run the compiled executable:**

   ```bash
   ./task-tracker add "Buy groceries"  # Linux/Mac
   task-tracker.exe add "Buy groceries"  # Windows
   ```

## Usage

### Adding a Task

```bash
./task-tracker add "Buy groceries"
```

### Listing Tasks

```bash
# All tasks
./task-tracker list
# By status
./task-tracker list-todo
./task-tracker list-in-progress
./task-tracker list-done
```

### Updating a Task

```bash
./task-tracker update <task-index> "New task description"
```

### Deleting a Task

```bash
./task-tracker delete <task-index>
```

### Marking a Task

```bash
# in progress
./task-tracker mark-in-progress <task-index>
# as done
./task-tracker mark-done <task-index>
# todo
./task-tracker mark-todo <task-index>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Built for https://roadmap.sh/projects/task-tracker
