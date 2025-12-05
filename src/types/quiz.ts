export interface QuizType {
  title: string;
  description: string;
  imageUrl: string;
  questions: QuestionType[];
  results: ResultType[];
}

export interface QuestionType {
  question: string;
  imageUrl: string;
  answers: AnswerType[];
}

export interface AnswerType {
  answer: string;
  tags: string[];
  imageUrl: string;
}

export interface ResultType {
  result: string;
  description: string; // TODO: support links in descriptions
  tags: string[];
  imageUrl: string;
}
