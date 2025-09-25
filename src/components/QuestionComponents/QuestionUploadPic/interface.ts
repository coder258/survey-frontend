export type QuestionUploadPicPropsType = {
  title?: string;
  imgCrop?: boolean;
  acceptImgType?: string[];
  maxSize?: number;
  file?: any;
  onChange?: (value: QuestionUploadPicPropsType) => void;
  disabled?: boolean;
};

export const QuestionUploadPicDefaultProps: QuestionUploadPicPropsType = {
  title: '图片上传标题',
  imgCrop: true,
  maxSize: 2,
  acceptImgType: ['image/png', 'image/jpeg'],
  file: null,
};
