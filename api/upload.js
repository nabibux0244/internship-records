import { put, list, get } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const file = req.body.file; // base64 or ArrayBuffer
    const fileName = req.body.name;

    const blob = await put('uploads/' + fileName, file, {
      access: 'public',
      token
    });

    res.status(200).json({ url: blob.url });
  } else if (req.method === 'GET') {
    // List all uploaded files
    const files = await list('uploads/', { token });
    res.status(200).json(files.blobs);
  } else {
    res.status(405).end();
  }
}
