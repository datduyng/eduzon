'''
# this program attempt to scrapper the first n-th query of encryptd image on google
https://www.youtube.com/watch?v=MaWm1VpWj1A

chcp 65001
set PYTHONIOENCODING=utf-8
avoid error: 
UnicodeEncodeError: 'charmap' codec can't encode character '\u2661' in position 71490: character maps to <undefined>
'''

import random
from bs4 import BeautifulSoup as bs
import requests
import urllib.request  as urllib2
import json
import time
def save_im_from_url(im_link, file_name):
    urllib2.urlretrieve(im_link,file_name)

def im_link_scrapper(query,n):# scrapp link of the first n image
    im_dir_name = './query-image/'
    # query = 'friend+need+be+friend';
    url="https://www.google.co.in/search?q="+query+"&source=lnms&tbm=isch"

    #https://techblog.willshouse.com/2012/01/03/most-common-user-agents/
    header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'}

    # headers = {"User Agent": random.choice(user_agent)}

    # req = requests.get(url, headers=headers)
    # response = urllib3.urlopen(url)
    # webcontent = reponse.read()

    # html = req.content 
    html = urllib2.urlopen(urllib2.Request(url,headers=header))
    soup = bs(html,'html.parser')
    images = soup.find_all('div', {'class': 'rg_meta notranslate'})
    images_json = []
    im_links = []
    # get image link of each. put into a list. then download the image to the folder
    for idx,im in enumerate(images):
        if(idx==n): break
        images_json.append(json.loads(im.text))
        im_link = images_json[idx]['ou']
        im_links.append(im_link)
        file_name = im_dir_name+str(idx)+str(".jpg")
        # urllib2.urlretrieve(im_link,file_name)
        # time.sleep(2)
    return im_links
    # for s in im_links:
    #     print(s)
        
    # print(soup.prettify())

    # print(webcontent)

    # enable python debugger
    # import pdb; pdb.set_trace() 
    # appear a (pdb) environment in terminal 
    # > req 
    # > req.content

# print(im_link_scrapper('dog',2))