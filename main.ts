import { match } from "./matcher.ts";

const filePath = "./tasks.json";

interface Task {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string | null;
}

async function readTasks(): Promise<Task[]> {
  try {
    const jsonData = await Deno.readTextFile(filePath);
    return JSON.parse(jsonData);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return [];
    }
    throw error;
  }
}

async function writeTasks(tasks: Task[]) {
  await Deno.writeTextFile(filePath, JSON.stringify(tasks, null, 2));
}

const handlers = {
  add: async (taskDescription: string) => {
    const tasks = await readTasks();
    tasks.push({
      description: taskDescription,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: null,
      id: tasks.length,
    });
    await writeTasks(tasks);
    console.log(`Task added: "${taskDescription}"`);
  },

  update: async (index: number, newDescription: string) => {
    const tasks = await readTasks();
    if (index >= 0 && index < tasks.length) {
      tasks[index].description = newDescription;
      tasks[index].updatedAt = new Date().toISOString();
      await writeTasks(tasks);
      console.log(`Task updated: "${newDescription}"`);
    } else {
      console.error("Invalid task index");
    }
  },

  delete: async (index: number) => {
    const tasks = await readTasks();
    if (index >= 0 && index < tasks.length) {
      const deletedTask = tasks.splice(index, 1);
      await writeTasks(tasks);
      console.log(`Task deleted: "${deletedTask[0].description}"`);
    } else {
      console.error("Invalid task index");
    }
  },

  listAll: async () => {
    const tasks = await readTasks();
    tasks.forEach((task, index) =>
      console.log(`${index}: ${task.description} [${task.status}]`)
    );
  },

  listByStatus: async (status: "done" | "in-progress" | "todo") => {
    const tasks = await readTasks();
    tasks
      .filter((task) => task.status === status)
      .forEach((task, index) =>
        console.log(`${index}: ${task.description} [${task.status}]`)
      );
  },

  markInProgress: async (index: number) => {
    const tasks = await readTasks();
    if (index >= 0 && index < tasks.length) {
      tasks[index].status = "in-progress";
      await writeTasks(tasks);
      console.log(`Task marked as in progress: "${tasks[index].description}"`);
    } else {
      console.error("Invalid task index");
    }
  },

  markAsDone: async (index: number) => {
    const tasks = await readTasks();
    if (index >= 0 && index < tasks.length) {
      tasks[index].status = "done";
      await writeTasks(tasks);
      console.log(`Task marked as done: "${tasks[index].description}"`);
    } else {
      console.error("Invalid task index");
    }
  },
  help: () => {
    console.log(
      "help",
      "add",
      "delete",
      "update",
      "list",
      "list-done",
      "list-in-progress",
      "list-todo",
      "mark-in-progress",
      "mark-done",
      "mark-todo"
    );
  },
};

function main() {
  const args = Deno.args;

  if (args.length < 1) {
    console.error("Usage: task-cli <command> [arguments]");
    Deno.exit(1);
  }

  const command = args[0];
  const values = args.slice(1);

  match(command)
    .with("help", () => handlers.help())
    .with("add", () => handlers.add(values.join(" ")))
    .with("delete", () => handlers.delete(parseInt(values[0])))
    .with("update", () =>
      handlers.update(parseInt(values[0]), values.slice(1).join(" "))
    )
    .with("list", () => {
      if (values[0] === "done") {
        handlers.listByStatus("done");
      } else if (values[0] === "in-progress") {
        handlers.listByStatus("in-progress");
      } else if (values[0] === "todo") {
        handlers.listByStatus("todo");
      } else {
        handlers.listAll();
      }
    })
    .with("mark-in-progress", () =>
      handlers.markInProgress(parseInt(values[0]))
    )
    .with("mark-done", () => handlers.markAsDone(parseInt(values[0])))
    .otherwise(() => {
      console.error(`Unknown command: ${command}`);
      Deno.exit(1);
    });
}

if (import.meta.main) {
  await main();
}
