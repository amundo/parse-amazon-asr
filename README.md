# Use Amazon Automatic Speech Recognition to create a JSON file


Amazon.com offers free speech to text recognition. The output is a very detailed but overwhelmingly verbose `JSON` file with contents that look like this:


## How to use Amazon’s speech to text

Sign in

<https://console.aws.amazon.com/s3/>

Select the bucket (dissertation)

“upload”

click through until upload happens.

click the “Copy path” button (you want the `s3://` url, not the `https://` one

continue below.


### Upload audio to a bucket


<https://console.aws.amazon.com/s3/>


I used a one-sentence recording of myself, `sample.wav`, and uploaded it to a “bucket”, which I guess is essentially something like a directory.


### Run transcription

* Choose “services” > “Amazon Transcribe”
* Choose “Transcription jobs”
* “Create job”
* Create an all-ascii, no-space name
* Paste the URL from above in S3 Input URL

Leave Amazon default bucket I guess.

Wait.

When it's done, scroll down to `Transcription preview > Download transcript`, which will download the recognition data as a `JSON` file. I saved mine as `sample-asr-output.json`, which looks like this:


```js
{
  "jobName": "test-amazon-asr",
  "accountId": "785222139731",
  "results": {
    "transcripts": [
      {
        "transcript": "This is a test of the amazon speech to text recognition thingy."
      }
    ],
    "items": [
      {
        "start_time": "0.55",
        "end_time": "0.86",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "This"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "0.86",
        "end_time": "0.99",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "is"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "0.99",
        "end_time": "1.08",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "a"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "1.08",
        "end_time": "1.49",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "test"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "1.49",
        "end_time": "1.62",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "of"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "1.62",
        "end_time": "1.92",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "the"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "1.93",
        "end_time": "2.57",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "amazon"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "2.58",
        "end_time": "3.06",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "speech"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "3.06",
        "end_time": "3.19",
        "alternatives": [
          {
            "confidence": "0.9857",
            "content": "to"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "3.19",
        "end_time": "3.51",
        "alternatives": [
          {
            "confidence": "0.9982",
            "content": "text"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "3.51",
        "end_time": "4.22",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "recognition"
          }
        ],
        "type": "pronunciation"
      },
      {
        "start_time": "4.23",
        "end_time": "4.69",
        "alternatives": [
          {
            "confidence": "0.3726",
            "content": "thingy"
          }
        ],
        "type": "pronunciation"
      },
      {
        "alternatives": [
          {
            "confidence": "0.0",
            "content": "."
          }
        ],
        "type": "punctuation"
      }
    ]
  },
  "status": "COMPLETED"
}
```


This `JSON` structure is probably intended for more modeling (there are confidence levels and alternate recognitions and so forth). But I just want a quick-and-dirty aligned output, so I wrote a script to take the most confident recognition for every word and then create a format I’m more used to working with, which is what I call a  “`docling.js` text”. 

The converter, `amazon-asr-to-text.js`, is a module which can be imported either into a web interface or used on the command line.  It’s nothing fancy and could stand some iteration, but it gets the job done. 

I also have a [deno](https://deno.land) script which runs on the command line like this:

```
$ deno run amazon-asr-to-docling [input file name] [output-file-name]?
```

