const { spawn } = require("node:child_process");
const net = require("node:net");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const children = new Set();
let stopping = false;

function startApp(name, cwd, env = {}) {
  const child = spawn(npm, ["start"], {
    cwd: path.join(root, cwd),
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  children.add(child);
  child.once("error", (error) => {
    console.error(`Could not start ${name}: ${error.message}`);
    stop(1);
  });
  child.once("exit", (code) => {
    children.delete(child);
    if (!stopping) {
      console.error(`${name} stopped${code === 0 ? "" : ` with exit code ${code}`}.`);
      stop(code || 1);
    }
  });

  return child;
}

function portIsListening(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function stop(exitCode) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    child.kill("SIGTERM");
  }
  process.exitCode = exitCode;
}

async function main() {
  startApp("Frontend", "frontend", {
    BROWSER: "none",
    HOST: "0.0.0.0",
    PORT: "3000",
  });

  console.log("Waiting for the frontend on port 3000 before starting the API...");
  while (!stopping) {
    if (await portIsListening(3000)) break;
    await delay(300);
  }

  if (!stopping) {
    startApp("Backend API", "backend", { PORT: "8081" });
  }
}

process.once("SIGINT", () => stop(0));
process.once("SIGTERM", () => stop(0));

main().catch((error) => {
  console.error(error);
  stop(1);
});
