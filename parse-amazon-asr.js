import { amazonAsrToDocling } from "./amazon-asr-to-docling.js"
import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts"

const VERSION = "0.1"

const flags = parse(Deno.args, {
  boolean: ["help", "version"],
  default: { color: true },
})

let inputFileName = flags._[0]

let showHelp = () => {
  console.log(`
  
    $ amazon-asr-to-docling [input Amazon asr JSON] --output [output-file-name]?
  
  If no option flag is used, the input filename will replace -asr.json with -text.json.

  To install: 

    $ deno install --allow-read --allow-write parse-amazon-asr.js

  `)
  Deno.exit()
}

if(flags.help || !inputFileName){
  showHelp()
}

if (flags.version) {
  console.log(`${VERSION}`)
  Deno.exit()
}

let outputFileName
let asr 

if (inputFileName) {
  let json = await Deno.readTextFile(inputFileName)
  asr = JSON.parse(json)
}

if (!flags.output) {
  outputFileName = inputFileName.replace("-asr.json", "-text.json")
} else {
  outputFileName = flags.output
}

let text = amazonAsrToDocling({
  fileName: inputFileName,
  asr
})

let textJSON = JSON.stringify(text, null, 2)

Deno.writeTextFileSync(outputFileName, textJSON)
