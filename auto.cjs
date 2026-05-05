const { exec } = require("child_process");
const chokidar = require("chokidar");

console.log("👀 Vigilando cambios en Obsidian...");

// 🔥 watcher estable
const watcher = chokidar.watch("./content", {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  usePolling: true,
  interval: 1000,
});

let timeout = null;

watcher.on("all", (event, path) => {
  // Solo archivos .md
  if (!path.endsWith(".md")) return;

  console.log(`📌 ${event}: ${path}`);

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    console.log("🚀 Ejecutando build y push...");

    exec(
      `build.bat`,
      (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);

        if (err) {
          console.error("❌ Error:", err);
          return;
        }

        console.log("✅ Sitio actualizado!");
      }
    );
  }, 3000); // espera 3s para evitar múltiples ejecuciones
});