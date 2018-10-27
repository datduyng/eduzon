'''
This program attempt to process user input text. Check for
valid grammar. generate main keywork for each sentence.

'''
import spacy
# import language_check
import sys
# from rake_nltk import Rake
import operator
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# import SmartStopList

'''
doc: spacy doc object - https://spacy.io/usage/linguistic-features
'''
def getKeyword(doc):
    result = set()
    noun_count = 0
    for idx,token in enumerate(doc):
        if (token.is_alpha and (token.is_stop is False)):
            if(token.dep_ is 'nsubj' and token.pos_ != 'PRON' and token.lemma_ != '-PRON-'):# not I, you we,...
                result.add(' '+token.lemma_)
            elif((token.dep_ == 'ROOT' or token.dep_ is 'attr')and token.lemma_ != '-PRON-'):
                result.add(' '+token.lemma_)
            elif((token.dep_ is 'pobj' or token.dep_ is 'dobj')and token.lemma_ != '-PRON-'):
                result.add(' '+token.lemma_)
            elif(token.pos_ == 'VERB' and token.tag_ != 'VBZ'):
                result.add(' '+token.lemma_)
            elif(token.dep_ == 'pcomp' and token.pos_ == 'VERB'and token.lemma_ != '-PRON-'):
                result.add(' '+token.lemma_)
            elif(token.dep_ == 'poss' and token.pos_ == 'NOUN' and token.tag_ == 'NN'):
                result.add(' '+token.lemma_)

    if (result == ''):
        return ''
    return (''.join(result)) + ' pictures'

def getMainKeyword(query):
    # query = u'Once upon a time there lived a lion in a forest. One day after a heavy meal. It was sleeping under a tree. After a while, there came a mouse and it started to play on the lion. Suddenly the lion got up with anger and looked for those who disturbed its nice sleep. Then it saw a small mouse standing trembling with fear. The lion jumped on it and started to kill it. The mouse requested the lion to forgive it. The lion felt pity and left it. The mouse ran away.'
    #TODO: validate user input. What if there is
    # no period as delimiter in each sentence.
    # Detect the end of the sentence.
    # text = query
    # query_t = text.replace("and"," ")
    # texts_t = text.split(".")
    # stop_words = set(SmartStopList.words())
    # word_tokens = word_tokenize(text)
    # filtered_sentence = [w for w in word_tokens if not w in stop_words]
    # print (filtered_sentence)
    nlp = spacy.load('en_core_web_sm')

    # TODO:word each sentence in to list and gen keyword
    # for each sentence
    query = query.replace("and"," ")
    texts = query.split(".")
    docs = []
    keyWords = []
    # docs = [word=nlp(unicode(word, "utf-8")) for word in texts]
    for idx,text in enumerate(texts):
        if(text is None):
            continue
        doc = nlp(text)
        docs.append(doc)
        # ("====================")
        # for token in doc:
        #     print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
        #         token.shape_, token.is_alpha, token.is_stop)
        # print("=====================")
        keyword = getKeyword(doc)
        # for k in keyword:
        #     keyWords.add(k)
        #replace ' ' with '+'
        keyWords.append(keyword.strip().replace(' ','+'))



    return keyWords
    # for tok in keywords:
    #     print(tok)
    # print(kewords)

nlp = spacy.load('en_core_web_sm')
doc = str('\n')
for line in open(sys.argv[1],'r').readlines():
    doc += line


# print(doc)

# print ("Spacy test:")
# print ("==========================")
#
# output = getMainKeyword(doc)
# for sentence in output:
#     print (sentence)
#     # stop_words = set(SmartStopList.words())
#     # word_tokens = word_tokenize(sentence)
#     # filtered_sentence = [w for w in word_tokens if not w in stop_words]
#     # print (filtered_sentence)
#
# print ("==========================\n")
#
# print ("RAKE test:")
# print ("==========================")
#
# r = Rake()
# r.extract_keywords_from_text(doc)
# r.get_ranked_phrases()
#
# # for tuple in keywords:
# #     print (tuple[1])
#
# print ("==========================")

    # import pdb; pdb.set_trace()
