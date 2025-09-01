export type QuestionTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3;
  isCenter?: boolean;
  onChange?: (value: QuestionTitlePropsType) => void;
};

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
};
