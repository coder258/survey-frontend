export type QuestionUploadLargeFilePropsType = {
  title?: string;
  acceptFileType?: string[];
  file?: any;
  onChange?: (value: QuestionUploadLargeFilePropsType) => void;
  disabled?: boolean;
};

export const QuestionUploadLargeFileDefaultProps: QuestionUploadLargeFilePropsType = {
  title: '大文件上传标题',
  acceptFileType: [
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.txt',
    '.zip',
    '.rar',
    '.mp3',
    '.mp4',
    '.wav',
  ],
  file: null,
};
