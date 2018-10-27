#convert set of image and audio file to video
#http://hamelot.io/visualization/using-ffmpeg-to-convert-a-set-of-images-into-a-video/

# merging audio and video using ffmpeg
#https://www.youtube.com/watch?v=xugC0SsufaQ

#base on:https://www.programcreek.com/python/example/72134/cv2.VideoWriter

import os
# from cv2 import VideoWriter, VideoWriter_fourcc, imread, resize
import cv2 as cv2
import sounding as sound
# def make_video(images, outvid=None, fps=5, size=None,
#                is_color=True, format="XVID"):
#     """
#     Create a video from a list of images.
 
#     @param      outvid      output video
#     @param      images      list of images to use in the video
#     @param      fps         frame per second
#     @param      size        size of each frame
#     @param      is_color    color
#     @param      format      see http://www.fourcc.org/codecs.php
#     @return                 see http://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_gui/py_video_display/py_video_display.html
 
#     The function relies on http://opencv-python-tutroals.readthedocs.org/en/latest/.
#     By default, the video will have the size of the first image.
#     It will resize every image to this size before adding them to the video.
#     """
#     img_dir = './query-image/' 
#     fourcc = cv2.VideoWriter_fourcc(*format)
#     vid = None
#     for image in images:
#         image = img_dir + image
#         if not os.path.exists(image):
#             raise FileNotFoundError(image)
#         img = cv2.imread(image)
#         print(img.shape)
#         if vid is None:
#             if size is None:
#                 size = img.shape[1], img.shape[0]
#             vid = cv2.VideoWriter(outvid, fourcc, float(fps), size, is_color)
#         if size[0] != img.shape[1] and size[1] != img.shape[0]:
#             img = cv2.resize(img, size)
#         vid.write(img)
#     vid.release()
#     return vid

img_dir = './query-image'
images_path = os.listdir(img_dir)
images_path.sort()
print(images_path)
# make_video(images_path,outvid='image_video.avi',fps=1)
