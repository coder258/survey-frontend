import SparkMd5 from 'spark-md5';
import type { ChunkType } from './cutFile';

export const createChunk = async (
  file: File,
  index: number,
  chunkSize: number
): Promise<ChunkType> => {
  return new Promise(resolve => {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const blob = file.slice(start, end);
    const spark = new SparkMd5.ArrayBuffer();
    const fileReader = new FileReader();
    fileReader.onload = event => {
      spark.append(event.target?.result as ArrayBuffer);
      resolve({
        start,
        end,
        hash: spark.end(),
        blob,
        index,
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
};
