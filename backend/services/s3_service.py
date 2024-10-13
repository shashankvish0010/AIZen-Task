import boto3
from botocore.exceptions import ClientError
import logging
import os

class S3Service:
    def __init__(self):
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
            region_name=os.environ.get('AWS_REGION', 'eu-north-1')
        )
        self.bucket = os.getenv('S3_BUCKET')

    def upload_image(self, file, file_name):
        try:
         response = self.s3.upload_fileobj(file, self.bucket, file_name)
         return True
        except ClientError as e:
          logging.error(e)
          return False
        
    def get_image_url(self, file_name):
       try:
          return self.s3.generate_presigned_url('get_object', Params={'Bucket': self.bucket, 'Key': file_name}, ExpiresIn=518400)
       except ClientError as e:
        logging.error(e)
        return False