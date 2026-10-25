import type { Question } from '@/types/exam'

export const mockQuestions: Question[] = [
  // Level 1: Addition & Subtraction 
  { id: 1, level_id: 1, question: 'What is 5 + 7?', choices: ['10', '11', '12', '13'], correct_answer: '12' },
  { id: 2, level_id: 1, question: 'What is 9 - 4?', choices: ['4', '5', '6', '3'], correct_answer: '5' },
  { id: 3, level_id: 1, question: 'What is 12 + 8?', choices: ['18', '19', '20', '21'], correct_answer: '20' },
  { id: 4, level_id: 1, question: 'What is 15 - 6?', choices: ['9', '8', '10', '7'], correct_answer: '9' },
  { id: 5, level_id: 1, question: 'What is 23 + 17?', choices: ['38', '39', '40', '41'], correct_answer: '40' },

  // Level 2: Multiplication & Division
  { id: 6, level_id: 2, question: 'What is 8 × 9?', choices: ['64', '70', '72', '81'], correct_answer: '72' },
  { id: 7, level_id: 2, question: 'What is 56 ÷ 8?', choices: ['6', '7', '8', '9'], correct_answer: '7' },
  { id: 8, level_id: 2, question: 'What is 12 × 5?', choices: ['50', '55', '60', '65'], correct_answer: '60' },
  { id: 9, level_id: 2, question: 'What is 144 ÷ 12?', choices: ['10', '11', '12', '13'], correct_answer: '12' },
  { id: 10, level_id: 2, question: 'What is 100 ÷ 4?', choices: ['20', '25', '30', '35'], correct_answer: '25' },

  // Level 3: Fractions & Decimals
  { id: 11, level_id: 3, question: 'What is 1/2 + 1/4?', choices: ['1/4', '2/4', '3/4', '1'], correct_answer: '3/4' },
  { id: 12, level_id: 3, question: 'What is 0.5 + 0.25?', choices: ['0.65', '0.7', '0.75', '0.8'], correct_answer: '0.75' },
  { id: 13, level_id: 3, question: 'What is 1.5 + 2.25?', choices: ['3.5', '3.75', '4.0', '4.25'], correct_answer: '3.75' },
  { id: 14, level_id: 3, question: 'What is 5.5 - 2.25?', choices: ['3.0', '3.25', '3.5', '3.75'], correct_answer: '3.25' },
  { id: 15, level_id: 3, question: 'What is 1/2 × 1/2?', choices: ['1/8', '1/4', '1/2', '1'], correct_answer: '1/4' },

  // Level 4: Basic Algebra
  { id: 16, level_id: 4, question: 'Solve for x: x + 5 = 12', choices: ['5', '6', '7', '8'], correct_answer: '7' },
  { id: 17, level_id: 4, question: 'Solve for x: 3x = 15', choices: ['3', '4', '5', '6'], correct_answer: '5' },
  { id: 18, level_id: 4, question: 'What is x if x/2 = 9?', choices: ['16', '17', '18', '19'], correct_answer: '18' },
  { id: 19, level_id: 4, question: 'Simplify: 3x + 2x', choices: ['4x', '5x', '6x', '5x^2'], correct_answer: '5x' },
  { id: 20, level_id: 4, question: 'Solve for x: 5x = 2x + 9', choices: ['2', '3', '4', '5'], correct_answer: '3' }
]