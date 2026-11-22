import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const temp = mkdtempSync(join(tmpdir(), "agent-ready-ds-smoke-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: "inherit", timeout: 120_000 });
}

try {
  run(npm, ["run", "build"], root);
  run(npm, ["pack", "--pack-destination", temp, "--ignore-scripts"], root);
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const tarball = join(temp, pkg.name.replace(/^@/, "").replace("/", "-") + "-" + pkg.version + ".tgz");
  const dest = join(temp, "consumer");
  mkdirSync(dest);
  writeFileSync(join(dest, "package.json"), JSON.stringify({
    name: "agent-ready-independent-react-consumer-smoke",
    version: "0.0.0",
    private: true,
    type: "module",
    dependencies: {
      [pkg.name]: "file:" + tarball,
      react: "19.3.1",
      "react-dom": "19.3.1"
    }
  }, null, 2) + "\n");
  copyFileSync(join(root, "verification/package-consumer-smoke.mjs"), join(dest, "smoke.mjs"));
  run(npm, ["install", "--ignore-scripts", "--no-audit", "--no-fund"], dest);
  run(process.execPath, ["smoke.mjs"], dest);
  console.log("PASS: isolated npm tarball consumer smoke");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
