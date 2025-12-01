import parseQuizMarkdown from "./quiz-parser.js";
import fs from "fs";

const markdownText = fs.readFileSync("../what-color.md", "utf-8");
const jsonText = parseQuizMarkdown(markdownText);

console.log(JSON.stringify(jsonText, null, "\t"));
