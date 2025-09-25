/*
 * @Author: 唐宇
 * @Date: 2025-09-25 14:21:02
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-25 15:49:21
 * @FilePath: \survey-frontend\src\components\QuestionComponents\QuestionUploadLargeFile\utils\cutFile.ts
 * @Description: 大文件切片工具
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4;

export type ChunkType = {
  start: number;
  end: number;
  hash: string;
  blob: Blob;
  index: number;
};

export const cutFile = async (file: File): Promise<ChunkType[]> => {
  return new Promise(resolve => {
    const result: ChunkType[] = [];
    let finishedThreadCount = 0;
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module',
      });
      const startChunkIndex = i * threadChunkCount;
      const endChunkIndex = Math.min((i + 1) * threadChunkCount, chunkCount);
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startChunkIndex,
        endChunkIndex,
      });
      worker.onmessage = event => {
        const chunks = event.data;
        for (let i = startChunkIndex; i < endChunkIndex; i++) {
          result[i] = chunks[i - startChunkIndex];
        }
        worker.terminate();
        finishedThreadCount++;
        if (finishedThreadCount === THREAD_COUNT) {
          resolve(result);
        }
      };
    }
  });
};
