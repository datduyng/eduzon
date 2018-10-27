"""Getting Started Example for Python 2.7+/3.3+"""\

'''
# amazon polly docs 
https://docs.aws.amazon.com/polly/latest/dg/polly-dg.pdf

# run sub process to get speech time
https://aws.amazon.com/blogs/machine-learning/convert-your-text-into-an-mp3-file-with-amazon-polly-and-a-simple-python-script/
~/Google Drive/pPlayground/eduzon 

# piping input of multiple program in python 
https://stackoverflow.com/questions/13332268/python-subprocess-command-with-pipe

# Json quoting in window terminal 
https://acloud.guru/forums/aws-dynamodb/discussion/-KzG6wJR9LDKNioVICJ9/Single%20quotes%20in%20AWS%20CLI%20options

# XML speech mark file docs
https://docs.aws.amazon.com/polly/latest/dg/using-speechmarks.html
'''

from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError
from contextlib import closing
import os
import sys
import subprocess as sp



def getAudioFileFromText(query, fileName):
    # Create a client using the credentials and region defined in the [adminuser]
    # section of the AWS credentials file (~/.aws/credentials).
    session = Session(profile_name="adminuser")
    polly = session.client("polly",region_name='us-east-1')

    audio_file_name = 'audioTiming.txt'
    # Speech mark indicate the type of lemma you want to query from awws polly 
    #ex:  --speech-mark-types=\"[\\\"viseme\\\", \\\"word\\\", \\\"sentence\\\"]\"
    cmd = 'aws polly synthesize-speech --output-format json --voice-id Joanna --text \"'+query+'\" --speech-mark-types=\"[\\\"sentence\\\"]\" '+audio_file_name

   



    print(cmd) 
    try:
        # Request speech synthesis
        response = polly.synthesize_speech(Text=query, OutputFormat="mp3",
        VoiceId="Joanna")
        lengthText = polly.synthesize_speech(Text=query, OutputFormat="json",
        VoiceId="Joanna", SpeechMarkTypes=["viseme"])
        sp.run(cmd, shell=True, check=True)

    except (BotoCoreError, ClientError) as error:
        # The service returned an error, exit gracefully
        print(error)
        sys.exit(-1)
    # Access the audio stream from the response
    if "AudioStream" in response:
    # Note: Closing the stream is important as the service throttles on the
    # number of parallel connections. Here we are using contextlib.closing to
    # ensure the close method of the stream object will be called automatically
    # at the end of the with statement's scope.
        with closing(response["AudioStream"]) as stream:
            # output = './speech.mp3'
            try:
                # Open a file for writing the output as a binary stream
                with open(fileName, "wb") as file:
                    file.write(stream.read())
            except IOError as error:
                # Could not write to file, exit gracefully
                print(error)
                sys.exit(-1)
    else:
        # The response didn't contain audio data, exit gracefully
        print("Could not stream audio")
        sys.exit(-1)
        # Play the audio using the platform's default player
    # if sys.platform == "win32":
    #     os.startfile(output)
    # else:
    #     # the following works on Mac and Linux. (Darwin = mac, xdg-open = linux).
    #     opener = "open" if sys.platform == "darwin" else "xdg-open"
    #     subprocess.call([opener, output])

# query = u'I love Banana. I love you as well. Let me tell you a story. My father is a worker at a factory'

# query = 'Once upon a time there lived a lion in a forest. One day after a heavy meal. It was sleeping under a tree. After a while, there came a mouse and it started to play on the lion. Suddenly the lion got up with anger and looked for those who disturbed its nice sleep. Then it saw a small mouse standing trembling with fear. The lion jumped on it and started to kill it. The mouse requested the lion to forgive it. The lion felt pity and left it. The mouse ran away. On another day, the lion was caught in a net by a hunter. The mouse came there and cut the net. Thus it escaped. There after, the mouse and the lion became friends. They lived happily in the forest afterwards. '
# fileName = './audio/speech.mp3'
# getAudioFileFromText(query, fileName)
