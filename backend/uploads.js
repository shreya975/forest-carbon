// backend/uploads.js
const { Web3Storage, getFilesFromPath } = require('web3.storage');
const client = new Web3Storage({ token: process.env.WEB3_TOKEN });

async function uploadFile(path) {
  const files = await getFilesFromPath(path);
  const cid = await client.put(files);
  return `ipfs://${cid}`;
}
module.exports = { uploadFile };