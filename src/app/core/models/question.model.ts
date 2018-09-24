import { ControlType } from './control-types.enums';

export interface Question {
    question: string;
    answer: string;
    ctrlType: ControlType;
    options?: string[];
}
