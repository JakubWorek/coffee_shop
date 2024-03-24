import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req){
  const data = await req.formData();
  if (data.get('file')){
    const file = data.get('file');

    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      }
    });

    const ext = file.name.split('.').slice(-1)[0];
    const newFilename = Date.now() + '.' + ext;

    const chunks = [];
    for await (const chunk of file.stream()){
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucket = 'kuba-next-ecommerce';

    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFilename,
      ACL: 'public-read',
      ContentType: file.type,
      Body: buffer,
    }));

    const link = 'https://' + bucket + '.s3.eu-north-1.amazonaws.com/' + newFilename
    return Response.json(link);
  }
}