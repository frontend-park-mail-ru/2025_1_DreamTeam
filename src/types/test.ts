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
export type TestStructure = {
    test: Test;
};
  