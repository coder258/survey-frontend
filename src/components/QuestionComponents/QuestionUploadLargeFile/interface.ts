export type QuestionUploadLargeFilePropsType = {
  title?: string;
  acceptFileType?: string[];
  file?: any;
  maxSize?: number;
  onChange?: (value: QuestionUploadLargeFilePropsType) => void;
  disabled?: boolean;
};

export const QuestionUploadLargeFileDefaultProps: QuestionUploadLargeFilePropsType = {
  title: '大文件上传标题',
  acceptFileType: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/x-zip-compressed',
    'audio/mp3',
    'video/mp4',
    'audio/wav',
  ],
  maxSize: 1024 * 2,
  file: null,
};
