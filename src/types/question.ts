export type Question = {
  question: string;
  left_lebal: string;
  right_lebal: string;
  metric: string;
};

export type QuestionsStructure = {
  questions: Question[];
};
