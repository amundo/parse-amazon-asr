export let amazonAsrToDocling = ({fileName, asr}) => {
  let sentences = asr.results.items.reduce((sentences, token) => {
    if(token.type == 'punctuation'){
      let sentence = sentences[sentences.length-1]
      let content = token.alternatives[0].content.trim()
      sentence.transcription += content + ' '

      sentence.transcription = sentence.transcription.trim()

      sentences.push({
        transcription:"", 
        translation: "", 
        words: [], 
        metadata: {
          links: [
            {
              type: 'timestamp',
              start: null, 
              end: sentence.words[sentence.words.length-1].metadata.end, 
              speaker: null
            }
          ]
        } 
      })
    } else { 
      let sentence = sentences[sentences.length-1]
      let content = ' ' + token.alternatives[0].content
      sentence.transcription += content

      let end = parseFloat(token.end_time)
      let start = parseFloat(token.start_time)

      if(sentence.words.length === 0){
        sentence.metadata.links[0].start = start
      }
      
      let word = {
        form: content.trim(), 
        gloss: "",
        metadata: {
          links: [
            {
              type: 'timestamp',
              start, 
              end, 
              speaker: null
            }
          ]
          }
      }

      sentence.words.push(word)  
    }
    return sentences
  }, 
    [
      {
        transcription:"", 
        translation: "", 
        words: [], 
        metadata: {
          links: [
            {
              type: 'timestamp',
              start:0, 
              end:0, 
              speaker: null
            }
          ]
        } 
      }
    ])

  return {
    metadata: {
      title: `Converted from Amazon ASR`,
      links: [
         {
           type: "audio",
           file: fileName.replace("-asr.json", ".mp3")
         }
       ]
    }, 
    sentences
  }
}