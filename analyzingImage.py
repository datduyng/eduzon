# https://docs.aws.amazon.com/rekognition/latest/dg/images-s3.html
# region
#https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html
import boto3
import requests
import sys
import os
# import imageScrapper

# print all bucket 
''' 
base on aws
print all available bucket
'''
def print_all_bucket_name():
    s3 = boto3.resource('s3')
    print(s3.buckets.all())
    for bucket in s3.buckets.all():
        print(bucket)

'''
This function return a image given url 
return iamge in byte.
'''
def get_image_from_url(imUrl):
    resp = requests.get(imUrl)
    imBytes = resp.content
    return imBytes

'''
this function return image in byte 
given fileName
'''
def get_image_from_file(fileName):
    with open(fileName, 'rb') as imFile:
        return imFile.read()

# if __name__ == "__main__":
#     print("here")


'''
param: im_links list of link
'''
def get_associate_from_im(im_links):

    fileName='0.jpg'
    bucket='rekcog'

    os.environ['AWS_PROFILE'] = "adminuser"
    os.environ['AWS_DEFAULT_REGION'] = "us-east-1"
    client=boto3.client('rekognition',region_name='us-east-1')

    associates = []
    # ''' Detect object in image ex
    # response = client.detect_labels(Image={'S3Object':{'Bucket':'rekcog','Name':fileName}})
    # response = client.detect_labels(Image={'S3Object':{'Bucket':'rekcog','Name':fileName}})

    #reponse given image in byte
    # imUrl = 'https://s7d1.scene7.com/is/image/PETCO/puppy-090517-dog-featured-355w-200h-d'
    # imUrl = 'https://i.ytimg.com/vi/JVkZGK06CXE/maxresdefault.jpg'
    # fileName = 
    # print(im_links)
    for imUrl in im_links:
        associate = []
        imBytes = get_image_from_url(imUrl)
        # print(imBytes)
        response = client.detect_labels(Image={'Bytes':imBytes})
        # print(response) 
        for label in response['Labels']:
            # print (label['Name'] + ' : ' + str(label['Confidence']))
            associate.append(label['Name'].lower())


        # imBytes = get_image_from_url(imUrl)
        response=client.detect_text(Image={'Bytes':imBytes})

        textDetections=response['TextDetections']
        # print(response)    for text in textDetections:
        texts = []
        for text in textDetections:
            associate.append(text['DetectedText'].lower())
            # print ('Detected text:' + text['DetectedText'])
            # print ('Confidence: ' + "{:.2f}".format(text['Confidence']) + "%")
            # print ('Id: {}'.format(text['Id']))
            # if 'ParentId' in text:
            #     print ('Parent Id: {}'.format(text['ParentId']))
            # print ('Type:' + text['Type'])
            # print('')
        associates.append(associate)
    # print(associates)
    return associates
        # associate.append(objects)
        # associate.append(texts)
        # print(associate)
        # print(objects)
        # print(texts)
        # s3 = boto3.resource('s3')
        # print(s3.buckets.all())
        # for bucket in s3.buckets.all():
        #     print(bucket)



        # ref
        #https://www.youtube.com/watch?v=f4NIuLb2QkI

