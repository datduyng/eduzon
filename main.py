import imageScrapper as imscrapper
import languageProcessing as langpo
import analyzingImage as analyzeim


if __name__ == "__main__":
    query = u'A friend in need is a friend indeed.Once upon a time there lived a lion in a forest. '#One day after a heavy meal. It was sleeping under a tree. After a while, there came a mouse and it started to play on the lion. Suddenly the lion got up with anger and looked for those who disturbed its nice sleep. Then it saw a small mouse standing trembling with fear. The lion jumped on it and started to kill it. The mouse requested the lion to forgive it. The lion felt pity and left it. The mouse ran away. On another day, the lion was caught in a net by a hunter. The mouse came there and cut the net. Thus it escaped. There after, the mouse and the lion became friends. They lived happily in the forest afterwards. '
    im_dir_name = './query-image/'
    main_keywords = langpo.getMainKeyword(query)
    # print(main_keywords)
    outputUrl = []
    for idex,keywords in enumerate(main_keywords):
        # print(keywords)
        file_name = im_dir_name+str(idex)+str(".jpg")
        urls = imscrapper.im_link_scrapper(str(keywords))
        
        try:
            associates = analyzeim.get_associate_from_im(urls)
            imscrapper.save_im_from_url(urls[0],file_name)
        except:
            continue
        
        
        # print(urls)
        # print(associates)
        #TODO: get score for each associate then pick the best
        # check if keywords in each token of associate then add up the score
        # then find the max score then choose that link
        outputUrl.append(urls[0])
    for i in outputUrl:
        print(i)

    # print(main_keywords)