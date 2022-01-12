import {amazonAsrToText}  from './amazon-asr-to-text.js'


// get the file name
let asrFileName = Deno.args[0]

// open the file
let json = await Deno.readTextFile(asrFileName)

// parse the json
let asr = JSON.parse(json)

let textFileName = asrFileName.replace('-asr.json', '-text.json')

let text = amazonAsrToText({
  fileName: asrFileName, 
  asr})

let textJSON = JSON.stringify(text,null,2)

Deno.writeTextFileSync(textFileName, textJSON)
