import imageScrapper as imscrapper
import languageProcessing as langpo
import analyzingImage as analyzeim
import sounding as sound
import shutil # too remove everything in a folder
import os 
import glob
import json
from pprint import pprint
import subprocess as sp 

'''
temporary function given a txt file in json.  convert to list of time associate 
with sentence

'''
def getAudioTimes(file_name, madeImgId):
    times = [] 
    fpss = [] # = 1/times = frame 
    
    data = []
    with open(file_name) as f:
        for line in f:
            data.append(json.loads(line))
    pprint(data)
    print(len(madeImgId))
    prev = 0.0
    # find fpss 
    for index, frame in enumerate(madeImgId):
        print("index:")
        print(index)
        if(index+1 == len(madeImgId)):
            times.append(2.000)# FIXME: at the end you need to find the actuall file elgnth

            break
        new = float(data[madeImgId[index+1]]["time"])
        times.append((new - prev)/1000.0)
        prev = new
    print("time")
    print(times)
    return times
    
    



if __name__ == "__main__":
    #TODO: add .xx at the end of the query
    # query = u'I love Banana. I love you as well. Let me tell you a story. My father is a worker at a factory.me'
    query = u'Once upon a time there lived a lion in a forest. One day after a heavy meal. It was sleeping under a tree. After a while, there came a mouse and it started to play on the lion. Suddenly the lion got up with anger and looked for those who disturbed its nice sleep. Then it saw a small mouse standing trembling with fear. The lion jumped on it and started to kill it. The mouse requested the lion to forgive it. The lion felt pity and left it. The mouse ran away. On another day, the lion was caught in a net by a hunter. The mouse came there and cut the net. Thus it escaped. There after, the mouse and the lion became friends. They lived happily in the forest afterwards. '
    im_dir_name = './query-image/'
    # remove everything under query-image dir 
    rmFiles = glob.glob(im_dir_name+'*')
    for rmF in rmFiles:
        os.remove(rmF) 
    madeImgId = []
    queryText = query[:-3] # trim the last 3 text before feeding through model
    main_keywords = langpo.getMainKeyword(queryText)
    # print(main_keywords)
    outputUrl = []
    for idex,keywords in enumerate(main_keywords):
        # print(keywords)
        file_name = im_dir_name+str(idex)+str(".jpg")
        urls = imscrapper.im_link_scrapper(str(keywords),2)
        # print(urls)
        try:
            # print(urls)
            associates = analyzeim.get_associate_from_im(urls)
            # print(associates)
            imscrapper.save_im_from_url(urls[0],file_name)
            madeImgId.append(int(idex))
        except:
            # cannotFindIm.append(int(idex))
            continue
        
        
        # print(urls) 
        # print(associates)
        #TODO: get score for each associate then pick the best
        # check if keywords in each token of associate then add up the score
        # then find the max score then choose that link
        outputUrl.append(urls[0])
    # print(cannotFindIm)
    fileName = './audio/story.mp3'
    print("here")
    sound.getAudioFileFromText(query, fileName)
    print(madeImgId)
    audio_file_name = 'audioTiming.txt'
    times = getAudioTimes(audio_file_name,madeImgId)

    # write video
    ffmpeg_file = open("ffmpeg.txt","w")
    img_dir = './query-image/'
    images_path = os.listdir(img_dir)
    images_path.sort()

    for index,x in enumerate(madeImgId):
        ffmpeg_file.write("file \'"+img_dir+images_path[index]+"\'\n")
        ffmpeg_file.write("duration "+str(times[index])+"\n")
    
    cmd = 'ffmpeg -f concat -safe 0 -i ffmpeg.txt -vsync vfr -pix_fmt yuv420p output.mp4'
    sp.run(cmd, shell=True, check=True)

    #ffmpeg -f concat -i input.txt -vsync vfr -pix_fmt yuv420p output.mp4
    for i in outputUrl:
        print(i)

    # print(main_keywords)
    # combine mp3 and movie 
    #ffmpeg -i output.mp4 -i ./audio/story.mp3 -c copy mainv.mkv

