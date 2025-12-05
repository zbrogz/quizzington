import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const quizzes = defineCollection({ 
    loader: glob({ pattern: "**/*.md", base: "./public/quizzes" }),
 });

export const collections = { quizzes };