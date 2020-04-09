import fs from 'fs'  
import path from 'path'  
import axios from 'axios'

export default async function downloadImage () {  
  const url = 'http://yun.dui88.com/layer-site/video/7y43mt9fip_1586418340.ts'
  const fpath = path.resolve(__dirname, '../images', 'code.mp4')
  const writer = fs.createWriteStream(fpath)

  const response = await axios({
    url,
    method: 'GET',
    headers:{
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
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
