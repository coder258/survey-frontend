import { createChunk } from './createChunk';

onmessage = async event => {
  const data = event.data;
  const { file, CHUNK_SIZE, startChunkIndex, endChunkIndex } = data;
  const promises = [];

  for (let i = startChunkIndex; i < endChunkIndex; i++) {
    promises.push(createChunk(file, i, CHUNK_SIZE));
  }

  const chunks = await Promise.all(promises);
  postMessage(chunks);
};
