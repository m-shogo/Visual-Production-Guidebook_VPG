import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { load as loadYaml } from "js-yaml";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const ENTITY_MAP = {
  techniques: "technique.schema.json",
  recipes: "recipe.schema.json",
  references: "reference.schema.json",
  intents: "intent.schema.json",
};

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

let hasError = false;

for (const [dataDir, schemaFile] of Object.entries(ENTITY_MAP)) {
  const schemaPath = join(root, "schema", schemaFile);
  const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
  const validate = ajv.compile(schema);

  const dataDirPath = join(root, "data", dataDir);
  const files = readdirSync(dataDirPath).filter((f) => f.endsWith(".yaml"));

  if (files.length === 0) {
    console.log(`[skip] data/${dataDir}: no .yaml files`);
    continue;
  }

  for (const file of files) {
    const filePath = join(dataDirPath, file);
    let record;
    try {
      record = loadYaml(readFileSync(filePath, "utf8"));
    } catch (err) {
      hasError = true;
      console.error(`[FAIL] data/${dataDir}/${file}: YAML parse error — ${err.message}`);
      continue;
    }

    const valid = validate(record);
    if (valid) {
      console.log(`[OK]   data/${dataDir}/${file}`);
    } else {
      hasError = true;
      console.error(`[FAIL] data/${dataDir}/${file}`);
      for (const e of validate.errors) {
        console.error(`       ${e.instancePath || "/"} ${e.message}`);
      }
    }
  }
}

if (hasError) {
  console.error("\nスキーマ検証に失敗したファイルがあります。");
  process.exit(1);
} else {
  console.log("\nすべてのデータがスキーマに準拠しています。");
}
