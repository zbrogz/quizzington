const quizData = {
    title: "What color should you choose?",
    description: "My description",
    imageUrl: "./images/nature-color-wheel.png",
    questions: [
        {
            question: "What fruits do you like the most?",
            imageUrl: "./images/apples.jpg",
            answers: [
                {
                    answer: "Apples and cherries",
                    tags: ["red"],
                    imageUrl: "./images/apple-cherry.jpg",
                },
                {
                    answer: "Bananas and lemons",
                    tags: ["yellow"],
                    imageUrl: "./images/bananas-lemons.jpg",
                },
                {
                    answer: "Canteloupe and limes",
                    tags: ["green"],
                    imageUrl: "./images/cantelope-limes.jpg",
                },
                {
                    answer: "Tangerines and oranges",
                    tags: ["orange"],
                    imageUrl: "./images/tangerines-oranges.jpg",
                },
            ],
        },
        {
            question: "What animals do you like the most?",
            imageUrl: "./images/animal.jpg",
            answers: [
                {
                    answer: "Cats and foxes",
                    tags: ["orange"],
                    imageUrl: "./images/animal.jpg",
                },
                {
                    answer: "Dogs and wolves",
                    tags: ["yellow"],
                    imageUrl: "./images/animal.jpg",
                },
                {
                    answer: "Frogs and parrots",
                    tags: ["green"],
                    imageUrl: "./images/animal.jpg",
                },
                {
                    answer: "Cardinals and ladybugs",
                    tags: ["red"],
                    imageUrl: "./images/animal.jpg",
                },
            ],
        },
        {
            question: "What kinds of weather do you enjoy?",
            imageUrl: "./images/weather.jpg",
            answers: [
                {
                    answer: "Sunny and bright",
                    tags: ["yellow"],
                    imageUrl: "./images/weather.jpg",
                },
                {
                    answer: "Rainy and calm",
                    tags: ["green"],
                    imageUrl: "./images/weather.jpg",
                },
                {
                    answer: "Stormy and energetic",
                    tags: ["red"],
                    imageUrl: "./images/weather.jpg",
                },
                {
                    answer: "Warm and breezy",
                    tags: ["orange"],
                    imageUrl: "./images/weather.jpg",
                },
            ],
        },
        {
            question: "What types of hobbies do you prefer?",
            imageUrl: "./images/hobbies.jpg",
            answers: [
                {
                    answer: "Painting and crafting",
                    tags: ["orange"],
                    imageUrl: "./images/hobbies.jpg",
                },
                {
                    answer: "Reading and writing",
                    tags: ["green"],
                    imageUrl: "./images/hobbies.jpg",
                },
                {
                    answer: "Sports and fitness",
                    tags: ["yellow"],
                    imageUrl: "./images/hobbies.jpg",
                },
                {
                    answer: "Cooking and baking",
                    tags: ["red"],
                    imageUrl: "./images/hobbies.jpg",
                },
            ],
        },
        {
            question: "Which types of vacations appeal to you most?",
            imageUrl: "./images/vacation.jpg",
            answers: [
                {
                    answer: "Beach trips and sunshine",
                    tags: ["yellow"],
                    imageUrl: "./images/vacation.jpg",
                },
                {
                    answer: "Mountain retreats and forests",
                    tags: ["green"],
                    imageUrl: "./images/vacation.jpg",
                },
                {
                    answer: "City exploration and nightlife",
                    tags: ["red"],
                    imageUrl: "./images/vacation.jpg",
                },
                {
                    answer: "Desert landscapes and warm climates",
                    tags: ["orange"],
                    imageUrl: "./images/vacation.jpg",
                },
            ],
        },
    ],
    results: [
        {
            result: "You would like red!",
            description: "Red is bold and energetic.",
            tags: ["red"],
            imageUrl: "./images/red.png",
        },
        {
            result: "You would like yellow!",
            description: "Yellow is cheerful and bright.",
            tags: ["yellow"],
            imageUrl: "./images/yellow.jpg",
        },
        {
            result: "You would like green!",
            description: "Green is calm and natural.",
            tags: ["green"],
            imageUrl: "./images/green.png",
        },
        {
            result: "You would like orange!",
            description: "Orange is warm and vibrant.",
            tags: ["orange"],
            imageUrl: "./images/orange.jpg",
        },
    ],
};

export default quizData;
