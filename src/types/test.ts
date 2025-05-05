export type Answers = {
  answer_id: number;
  answer: string;
  is_right: boolean;
};
export type UserAnswer = {
  is_right: boolean;
  question_id: number;
  answer_id: number;
};

export type Test = {
  question_id: number;
  question: string;
  answers: Answers[];
  user_answer: UserAnswer;
};

export type QuizStructure = {
  test: Test;
};

export type UserAnswer1 = {
  status: string;
  answer: string;
};

export type Question = {
  question_id: number;
  question: string;
  user_answer: UserAnswer1;
};

export type TestStructure = {
  question: Question;
};
