import { marked } from "marked";

const renderer = new marked.Renderer();

renderer.link = function ({ href, title, text }) {
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
};

marked.use({ renderer });

const parseQuizMarkdown = (md) => {
    // Remove BOM if present and normalize newlines
    md = md.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");

    const extractImage = (line) => {
        const m = line.match(/<img\s+[^>]*src=(["'])(.*?)\1/i);
        return m ? "../" + m[2] : null;
    };

    // strip HTML comments from a line (handles multi-line comments if they appear inside the line text)
    const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, "");

    const resultObj = {
        title: "",
        imageUrl: "",
        description: "",
        questions: [],
        results: [],
    };

    let section = "intro"; // intro | questions | results
    let currentQuestion = null;
    let currentAnswer = null;
    let currentResult = null;
    let seenIntroText = false; // to help decide description

    const lines = md.split("\n");

    for (let rawLine of lines) {
        // remove comments then trim
        const line = stripComments(rawLine).trim();
        if (!line) continue;

        const lower = line.toLowerCase();

        // Switch sections first to avoid confusing the quiz title with "# Results" etc.
        if (lower === "# questions") {
            // flush any pending question/answer before switching
            if (currentAnswer && currentQuestion) {
                currentQuestion.answers.push(currentAnswer);
                currentAnswer = null;
            }
            if (currentQuestion) {
                resultObj.questions.push(currentQuestion);
                currentQuestion = null;
            }
            section = "questions";
            continue;
        }
        if (lower === "# results") {
            // flush pending question/answer
            if (currentAnswer && currentQuestion) {
                currentQuestion.answers.push(currentAnswer);
                currentAnswer = null;
            }
            if (currentQuestion) {
                resultObj.questions.push(currentQuestion);
                currentQuestion = null;
            }
            section = "results";
            continue;
        }

        // IMAGE (common extraction)
        const img = extractImage(line);

        // ---------- INTRO ----------
        if (section === "intro") {
            if (line.startsWith("# ")) {
                // only accept first top-level # as title
                if (!resultObj.title) {
                    resultObj.title = line.replace(/^#\s*/, "").trim();
                }
                continue;
            }

            // top-level image (first image in intro)
            if (img && !resultObj.imageUrl) {
                resultObj.imageUrl = img;
                continue;
            }

            // description: first non-heading, non-image text in intro
            if (!line.startsWith("#") && !img && !resultObj.description) {
                resultObj.description = line;
                seenIntroText = true;
                continue;
            }

            // if we see small stray lines after description, ignore — keep only the first paragraph as description
            continue;
        }

        // ---------- QUESTIONS ----------
        if (section === "questions") {
            if (line.startsWith("## ")) {
                // new question: flush previous question
                if (currentAnswer && currentQuestion) {
                    currentQuestion.answers.push(currentAnswer);
                    currentAnswer = null;
                }
                if (currentQuestion) {
                    resultObj.questions.push(currentQuestion);
                }

                currentQuestion = {
                    question: line.replace(/^##\s*/, "").trim(),
                    imageUrl: "",
                    answers: [],
                };
                continue;
            }

            if (!currentQuestion) {
                // defensive: skip stray lines before first question header
                continue;
            }

            // question-level image (if there's an image and no currentAnswer)
            if (img && !currentAnswer && !currentQuestion.imageUrl) {
                currentQuestion.imageUrl = img;
                continue;
            }

            if (line.startsWith("### ")) {
                // new answer: flush previous answer
                if (currentAnswer) {
                    currentQuestion.answers.push(currentAnswer);
                }
                currentAnswer = {
                    answer: line.replace(/^###\s*/, "").trim(),
                    tags: [],
                    imageUrl: "",
                };
                continue;
            }

            // answer tags
            if (line.toLowerCase().startsWith("tags:") && currentAnswer) {
                const tagsPart = line.slice(5).trim();
                currentAnswer.tags = tagsPart
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                continue;
            }

            // answer image
            if (img && currentAnswer && !currentAnswer.imageUrl) {
                currentAnswer.imageUrl = img;
                continue;
            }

            // anything else inside questions is ignored
            continue;
        }

        // ---------- RESULTS ----------
        if (section === "results") {
            if (line.startsWith("## ")) {
                // flush previous result
                if (currentResult) {
                    resultObj.results.push(currentResult);
                }
                currentResult = {
                    result: line.replace(/^##\s*/, "").trim(),
                    description: "",
                    tags: [],
                    imageUrl: "",
                };
                continue;
            }

            if (!currentResult) {
                // defensive: skip stray lines before first result header
                continue;
            }

            // result tags
            if (line.toLowerCase().startsWith("tags:")) {
                const tagsPart = line.slice(5).trim();
                currentResult.tags = tagsPart
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                continue;
            }

            // result image
            if (img && !currentResult.imageUrl) {
                currentResult.imageUrl = img;
                continue;
            }

            // a plain paragraph beneath a result header — treat as description
            if (!line.startsWith("#") && !img) {
                currentResult.description += line;
                continue;
            }

            continue;
        }
    }

    // flush remaining answer/question/result
    if (currentAnswer && currentQuestion) {
        currentQuestion.answers.push(currentAnswer);
        currentAnswer = null;
    }
    if (currentQuestion) {
        resultObj.questions.push(currentQuestion);
        currentQuestion = null;
    }
    if (currentResult) {
        resultObj.results.push(currentResult);
        currentResult = null;
    }

    for (const result of resultObj.results) {
        if (result.description) {
            result.description = marked.parse(result.description);
            console.log("Parsed result description:", result.description);
        }
    }

    return resultObj;
};

export default parseQuizMarkdown;
