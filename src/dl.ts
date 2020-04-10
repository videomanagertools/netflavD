import fs from 'fs'  
import path from 'path'  
import axios from 'axios'

export default async function downloadImage () {  
  const url = 'https://fvs.io/redirector?token=bXJWQXVZWFdLM253cE9DLzBVUzNOYlpOblh1eC9XWW0rZGhaeHlWN0h6cFAyR3NFNTArczlORTAyeU9YbnVlMG5jR0lCUEtibko3dDFId3daekdIVzVaWW5CcmMydFBld2w4WWFFVGJsTU5xU3BhbGR3bHVUdHNLOHBtMWRJeStmR2RiL3VFdUFjR0twdkx3SHkxemNOOVRzWjFzdy9hbTlSRT06YitMUm1rdHg2S0h5VS96ZmZWdWc0QT09'
  const fpath = path.resolve(__dirname, '../images', 'code.mp4')
  const writer = fs.createWriteStream(fpath)

  const response = await axios({
    url,
    method: 'GET',
    headers:{
        'User-Agent':'Mozilla/5.0 (compatible;Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)',
        cookie:'__cfduid=dc1be798980bdc28c0a3aa35395826a9a1564201974',
        referer:'https://www.avple.video/v/60g3et0e7zxj16l',
        nobody:1,
        header:1,
        'accept-encoding':'gzip, deflate, br',
        'sec-fetch-dest':'document',
        'sec-fetch-mode': 'navigate'
    },
    responseType: 'stream'
  }).catch(err=>{
    console.log(err);
    return err
  })
  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
downloadImage()
