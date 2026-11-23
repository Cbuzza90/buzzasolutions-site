import { readFile, writeFile } from "node:fs/promises";
import { createPrivateEnvelope } from "../src/data/privateTestCrypto.js";

const [input, output, passwordFile] = process.argv.slice(2);
if (!input || !output || !passwordFile) throw new Error("Usage: node scripts/encrypt-private-test.mjs INPUT OUTPUT PASSWORD_FILE");
const payload = JSON.parse(await readFile(input, "utf8"));
const password = (await readFile(passwordFile, "utf8")).trimEnd();
if (!password) throw new Error("Password must not be empty");
await writeFile(output, JSON.stringify(await createPrivateEnvelope(payload, password)) + "\n");
