# AWS Lambda Image Resizer (Node.js 20)

This project uses **AWS Lambda + S3 + Sharp** to automatically resize images when they are uploaded to an S3 bucket.

## How it works
1. An image is uploaded to an S3 bucket
2. An S3 event triggers the Lambda function
3. Lambda reads the image into memory
4. The image is resized using the `sharp` library
5. The resized image is written back to the S3 bucket

## Tech stack
- AWS Lambda (Node.js 20.x)
- Amazon S3
- Sharp (image processing)
- CloudWatch Logs
- IAM (custom execution role)

## Why this project
This project helped me understand:
- Event-driven architecture in AWS
- Handling binary data in Lambda
- Managing native dependencies (`sharp`)
- IAM permissions and S3 triggers

## Notes
- `node_modules` is excluded from the repository
- Dependencies are defined via `package.json` and `package-lock.json`
