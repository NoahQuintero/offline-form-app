import { Question } from './question.model';

export interface Form {
    formCode: string;
    formName: string;
    questions: Question[];
    completerId?: string;
    completed?: boolean;
}
