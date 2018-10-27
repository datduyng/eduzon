import os
import subprocess as sp
ffmpeg_file = open("ffmpeg.txt","w")
img_dir = './query-image/'
images_path = os.listdir(img_dir)
images_path.sort()
print(images_path)
times = [2.759, 1.786, 2.000]
arrr = [0,2,3]
for index,x in enumerate(arrr):
    print(index)
    ffmpeg_file.write("file \'"+img_dir+images_path[index]+"\'\n")
    ffmpeg_file.write("duration "+str(times[index])+"\n")
cmd = 'ffmpeg -f concat -safe 0 -i ffmpeg.txt -vsync vfr -pix_fmt yuv420p output.mp4'
sp.run(cmd, shell=True, check=True)