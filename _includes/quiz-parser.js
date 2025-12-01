function extractImage(line) {
    const match = line.match(/<img[^>]*src="([^"]+)"/);
    return match ? match[1] : null;
}

function extractTags(line) {
    const match = line.match(/tags:\s*([a-zA-Z0-9,\s-]+)/);
    if (!match) return [];
    return match[1].split(",").map((t) => t.trim());
}

function parseQuizMarkdown(md) {
    const lines = md.split("\n").map((l) => l.trim());

    let i = 0;

    // ----- TITLE -----
    let title = "";
    let image = "";
    while (i < lines.length) {
        if (lines[i].startsWith("# ")) {
            title = lines[i].replace("# ", "").trim();
            i++;
            continue;
        }
        if (lines[i].includes("<img")) {
            image = extractImage(lines[i]);
            i++;
            break;
        }
        i++;
    }

    // Move to # Questions
    while (i < lines.length && !lines[i].startsWith("# Questions")) i++;
    i++; // move past "# Questions"

    // ----- QUESTIONS -----
    const questions = [];
    while (i < lines.length && !lines[i].startsWith("# Results")) {
        if (lines[i].startsWith("## ")) {
            // New question
            const questionText = lines[i].replace("## ", "").trim();
            i++;

            // Question image
            let questionImage = "";
            if (lines[i] && lines[i].includes("<img")) {
                questionImage = extractImage(lines[i]);
                i++;
            }

            const answers = [];

            // Read answers under this question until the next "## "
            while (
                i < lines.length &&
                !lines[i].startsWith("## ") &&
                !lines[i].startsWith("# Results")
            ) {
                if (lines[i].startsWith("### ")) {
                    const answerText = lines[i].replace("### ", "").trim();
                    i++;

                    let tags = [];
                    let answerImage = "";

                    // Read tags and image lines
                    while (
                        i < lines.length &&
                        !lines[i].startsWith("### ") &&
                        !lines[i].startsWith("## ") &&
                        !lines[i].startsWith("# Results")
                    ) {
                        if (lines[i].startsWith("- tags:")) {
                            tags = extractTags(lines[i]);
                        }
                        if (lines[i].includes("<img")) {
                            answerImage = extractImage(lines[i]);
                        }
                        i++;
                    }

                    answers.push({
                        answer: answerText,
                        tags,
                        image: answerImage,
                    });

                    continue;
                }
                i++;
            }

            questions.push({
                question: questionText,
                image: questionImage,
                answers,
            });

            continue;
        }

        i++;
    }

    // ----- RESULTS -----
    const results = [];
    while (i < lines.length) {
        if (lines[i].startsWith("## ")) {
            const resultText = lines[i].replace("## ", "").trim();
            i++;

            let tags = [];
            let resultImage = "";

            while (i < lines.length && !lines[i].startsWith("## ")) {
                if (lines[i].startsWith("- tags:")) {
                    tags = extractTags(lines[i]);
                }
                if (lines[i].includes("<img")) {
                    resultImage = extractImage(lines[i]);
                }
                i++;
            }

            results.push({
                result: resultText,
                tags,
                image: resultImage,
            });

            continue;
        }
        i++;
    }

    return {
        title,
        image,
        questions,
        results,
    };
}

export default parseQuizMarkdown;
