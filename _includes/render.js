(function () {
    const quiz = parseQuizMarkdown(window.quizMarkdown);
    console.log("Quiz", quiz);

    const app = document.getElementById("app");
    let currentQuestionIndex = 0;
    const answersChosen = {}; // questionIndex -> tag

    function showTitlePage() {
        app.innerHTML = `
            <h1>${quiz.title}</h1>
            ${quiz.image ? `<img src="${quiz.image}">` : ""}
            <button id="startBtn">Start Quiz</button>
        `;

        document.getElementById("startBtn").onclick = () => {
            currentQuestionIndex = 0;
            showQuestion();
        };
    }

    function showQuestion() {
        const q = quiz.questions[currentQuestionIndex];

        let answersHtml = q.answers
            .map((a, idx) => {
                const checked =
                    answersChosen[currentQuestionIndex] === a.tags[0]
                        ? "checked"
                        : "";
                return `
            <label class="answer-option">
                <input type="radio" 
                       name="answer" 
                       value="${a.tags[0]}"
                       ${checked}>
                <div>
                    <div>${a.answer}</div>
                    ${a.image ? `<img src="${a.image}" width="150">` : ""}
                </div>
            </label>
            `;
            })
            .join("");

        app.innerHTML = `
            <h2>${q.question}</h2>
            ${q.image ? `<img src="${q.image}">` : ""}
            
            <div class="answers">${answersHtml}</div>

            <div>
                <button id="backBtn" ${
                    currentQuestionIndex === 0 ? "disabled" : ""
                }>Back</button>
                <button id="nextBtn">Next</button>
            </div>
        `;

        document.getElementById("backBtn").onclick = () => {
            saveSelectedAnswer();
            currentQuestionIndex--;
            showQuestion();
        };

        document.getElementById("nextBtn").onclick = () => {
            if (!saveSelectedAnswer()) return;
            currentQuestionIndex++;
            if (currentQuestionIndex >= quiz.questions.length) {
                showResults();
            } else {
                showQuestion();
            }
        };
    }

    function saveSelectedAnswer() {
        const selected = document.querySelector("input[name='answer']:checked");
        if (!selected) {
            alert("Please select an answer.");
            return false;
        }
        answersChosen[currentQuestionIndex] = selected.value;
        return true;
    }

    function showResults() {
        // Count tags
        const tagCounts = {};
        Object.values(answersChosen).forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });

        // Determine top tag
        let topTag = null;
        let maxCount = -1;
        for (let tag in tagCounts) {
            if (tagCounts[tag] > maxCount) {
                topTag = tag;
                maxCount = tagCounts[tag];
            }
        }

        // Pick corresponding result
        const result = quiz.results.find((r) => r.tags.includes(topTag));

        app.innerHTML = `
            <h1>${result.result}</h1>
            ${result.image ? `<img src="${result.image}">` : ""}
            <button id="restartBtn">Restart</button>
        `;

        document.getElementById("restartBtn").onclick = () => {
            Object.keys(answersChosen).forEach((k) => delete answersChosen[k]);
            currentQuestionIndex = 0;
            showTitlePage();
        };
    }

    // Start app
    showTitlePage();
})();
