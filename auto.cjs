const { exec } = require("child_process");
const chokidar = require("chokidar");

console.log("👀 Vigilando cambios en Obsidian...");

const watcher = chokidar.watch("./content", {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

let timeout = null;
let lastRun = 0;

watcher.on("all", (event, path) => {
  if (!path.endsWith(".md")) return;

  console.log(`📌 Evento: ${event} en ${path}`);

  // Evitar loop infinito
  if (Date.now() - lastRun < 5000) {
    console.log("🚫 Ignorado (loop de build)");
    return;
  }

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    lastRun = Date.now();

    console.log("🚀 Ejecutando build y push...");

    exec(`
build.bat &&
git add . &&
git commit -m "auto update" || echo no changes &&
git push
`, (err, stdout, stderr) => {
  console.log(stdout);
  console.error(stderr);

  if (err) {
    console.error("❌ Error:", err);
    return;
  }

  console.log("✅ Sitio actualizado!");
});

  }, 2000);
});