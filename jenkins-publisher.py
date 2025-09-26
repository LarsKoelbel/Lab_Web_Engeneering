## Publish websites to AWS

import os
import subprocess
import json

def publish_project(path: str) -> bool:
    # Get the aws endpoint
    aws_endpoint_file = os.path.join(path, 'jenkins-info.json')
    if not os.path.isfile(aws_endpoint_file):
        print(f"Project has no aws endpoint file or the file is misplaced.\nERROR: File not found: {aws_endpoint_file}. Publishing aborted!")
        return False
    try:
        with open(aws_endpoint_file, 'r') as file:
            aws_data = json.load(file)

        aws_s3_bucket = aws_data.get('aws_s3_bucket')
        aws_cloudfront_id = aws_data.get('aws_cloudfront_id')

        print(f'Found project s3 bucket: {aws_s3_bucket}')
        print(f'Found project CloudFront ID: {aws_cloudfront_id}')

        if not aws_s3_bucket or not aws_cloudfront_id:
            print('AWS S3 bucket or CloudFront ID is missing in the JSON file. Publishing aborted!')
            return False

        # Find the public folder
        public_folder = os.path.join(path, 'public')
        if not os.path.isdir(public_folder):
            print(f'Project has no public folder or the folder is misplaced.\nERROR: Folder not found: {public_folder}. Publishing aborted!')
            return False

        # Publish the public folder to the S3 bucket
        print(f'Publishing {public_folder} to S3 bucket {aws_s3_bucket}...')

        # Remove everything from the S3 bucket and upload the new files
        print('Removing old files from S3 bucket...')
        result = subprocess.run(f'aws s3 rm s3://{aws_s3_bucket} --recursive', shell=True)
        if result.returncode != 0:
            print(f'Error occurred while removing old files from S3 bucket: {result.stderr}')
            return False

        print('Uploading new files to S3 bucket...')
        result = subprocess.run(f'aws s3 sync {public_folder} s3://{aws_s3_bucket}', shell=True)
        if result.returncode != 0:
            print(f'Error occurred while uploading new files to S3 bucket: {result.stderr}')
            return False


        # Invalidate the CloudFront cache
        print('Invalidating CloudFront cache...')
        result = subprocess.run(f'aws cloudfront create-invalidation --distribution-id {aws_cloudfront_id} --paths "/*"', shell=True)
        if result.returncode != 0:
            print(f'Error occurred while invalidating CloudFront cache: {result.stderr}')
            return False
        

        print('Publishing completed successfully.')
        return True

    except Exception as e:
        print(f'The following error occurred during publishing: {e}\nPublishing aborted!')
        return False

def update_all():
    projects = [os.path.join(os.getcwd(), x) for x in os.listdir(os.getcwd()) if x.startswith('project')]
    print('Found the following projects:')
    for p in projects:
        print(f'\t{p}')
    print('Updating all...')

    failed_projects = []

    for p in projects:
        print(f'Publishing project: {p}')
        if not publish_project(p):
            print(f'Failed to publish project: {p}')
            failed_projects.append(p)

    print('\n####################################\n')

    if failed_projects:
        print('Publishing completed with errors.')
        print('The following projects failed to publish:')
        for fp in failed_projects:
            print(f'\t{fp}')
            continue
    else:
        print('All projects updated successfully.')



if __name__ == '__main__':
    update_all()