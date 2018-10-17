'''
This program attempt to process user input text. Check for
valid grammar. generate main keywork for each sentence. 

'''
import spacy

'''
doc: spacy doc object - https://spacy.io/usage/linguistic-features
'''
def getKeyword(doc):
    result = ''
    noun_count = 0
    for idx,token in enumerate(doc):
        if(token.dep_ is 'nsubj' and token.pos_ != 'PRON' and token.lemma_ != '-PRON-'):# not I, you we,...
            result= result +' '+token.lemma_
        elif((token.dep_ == 'ROOT' or token.dep_ is 'attr')and token.lemma_ != '-PRON-'):
            result= result +' '+token.lemma_
        elif((token.dep_ is 'pobj' or token.dep_ is 'dobj')and token.lemma_ != '-PRON-'):
            result= result +' '+token.lemma_
        elif(token.dep_ == 'xcomp' and token.pos_ == 'VERB'and token.lemma_ != '-PRON-'):
            result= result +' '+token.lemma_
    return result+' picture'

def getMainKeyword(query):
    # query = u'Once upon a time there lived a lion in a forest. One day after a heavy meal. It was sleeping under a tree. After a while, there came a mouse and it started to play on the lion. Suddenly the lion got up with anger and looked for those who disturbed its nice sleep. Then it saw a small mouse standing trembling with fear. The lion jumped on it and started to kill it. The mouse requested the lion to forgive it. The lion felt pity and left it. The mouse ran away.'
    #TODO: validate user input. What if there is 
    # no period as delimiter in each sentence. 
    # Detect the end of the sentence. 
    nlp = spacy.load('en_core_web_sm')

    # TODO:word each sentence in to list and gen keyword
    # for each sentence
    query = query.replace("and"," ")
    texts = query.split(".")
    docs = []
    keywords = []
    # docs = [word=nlp(unicode(word, "utf-8")) for word in texts]
    for idx,word in enumerate(texts):
        if(word.isspace()):
            continue
        doc = nlp(word)
        docs.append(doc)
        # ("====================")
        # for token in doc:
        #     print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
        #         token.shape_, token.is_alpha, token.is_stop)
        # print("=====================")
        keyword = getKeyword(doc)
        #replace ' ' with '+'
        keywords.append(keyword.strip().replace(' ','+'))

        

    return keywords
    # for tok in keywords:
    #     print(tok)
    # print(kewords)



    # import pdb; pdb.set_trace() 