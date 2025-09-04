import Component from './Component';
import PropsComponent from './PropsComponent';
import { QuestionRateDefaultProps } from './interface';

export * from './interface';

export default {
  title: '评分',
  type: 'questionRate',
  Component,
  PropsComponent,
  defaultProps: QuestionRateDefaultProps,
};
