import sharp from "sharp";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const handler = async (event) => {
  console.log("Lambda invoked");

  const record = event.Records[0];
  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

  // skip non-images
  if (!key.match(/\.(jpg|jpeg|png|webp)$/i)) {
    console.log("Not an image, skipping:", key);
    return;
  }

  const obj = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  );

  const buffer = Buffer.from(await obj.Body.transformToByteArray());

  const resized = await sharp(buffer)
    .resize(512, 512, { fit: "inside" })
    .toBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: `resized/${key}`,
      Body: resized,
      ContentType: "image/jpeg",
    })
  );

  console.log("Image resized:", key);
};

