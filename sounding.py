"""Getting Started Example for Python 2.7+/3.3+"""\

# run sub process to get speech time
# https://aws.amazon.com/blogs/machine-learning/convert-your-text-into-an-mp3-file-with-amazon-polly-and-a-simple-python-script/
#~/Google Drive/pPlayground/eduzon 

#piping input of multiple program in python 
#https://stackoverflow.com/questions/13332268/python-subprocess-command-with-pipe

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
    polly = session.client("polly")
    try:
        # Request speech synthesis
        response = polly.synthesize_speech(Text=query, OutputFormat="mp3",
        VoiceId="Joanna")
        lengthText = polly.synthesize_speech(Text=query, OutputFormat="json",
        VoiceId="Joanna", SpeechMarkTypes=["viseme"])
        print(lengthText)
        print("==========")
        print(response)
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


query = 'Life is good'
fileName = './audio/speech.mp3'
getAudioFileFromText(query, fileName)
