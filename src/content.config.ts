import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const quizzes = defineCollection({ 
    loader: glob({ pattern: "**/*.md", base: "./quizzes" }),
 });

export const collections = { quizzes };