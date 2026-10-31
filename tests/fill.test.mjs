import { test } from "node:test";
import assert from "node:assert/strict";
import { fillTemplate } from "../fill.js";

test("replaces known placeholders with trimmed values", () => {
  const { text, missing } = fillTemplate("ID {{shop_id}} / {{ip}}", { shop_id: " 123 ", ip: "Иванов И. И." });
  assert.equal(text, "ID 123 / Иванов И. И.");
  assert.deepEqual(missing, []);
});

test("marks missing values with their label and reports each key once", () => {
  const { text, missing } = fillTemplate("{{a}} и {{a}} и {{b}}", { b: "x" }, { a: "Поле А" });
  assert.equal(text, "[Поле А] и [Поле А] и x");
  assert.deepEqual(missing, ["a"]);
});

test("treats empty and whitespace values as missing, falls back to the key as label", () => {
  const { text, missing } = fillTemplate("{{a}}|{{b}}", { a: "   ", b: "" });
  assert.equal(text, "[a]|[b]");
  assert.deepEqual(missing, ["a", "b"]);
});

test("leaves text without placeholders unchanged and ignores unknown syntax", () => {
  assert.equal(fillTemplate("без подстановок {не это}", {}).text, "без подстановок {не это}");
});

test("does not interpret replacement patterns in values", () => {
  assert.equal(fillTemplate("{{a}}", { a: "$& $1 $$" }).text, "$& $1 $$");
});

test("tolerates undefined values object", () => {
  assert.deepEqual(fillTemplate("{{a}}", undefined), { text: "[a]", missing: ["a"] });
});
