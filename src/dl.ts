import fs from 'fs'  
import path from 'path'  
import axios from 'axios'

export default async function downloadImage () {  
  const url = 'https://fvs.io/redirector?token=c1BHVFd3V0VaRldIN1pISGFyRWZPMmkraC9Kd2MySlBvQzNGZk00QXp0NW8rS2h4Sm1kUXFQK05RL0hoZ2dhVWdsTE0vdkRQQUU1ZnRBY2dxYWFocW9LelJzbDRlcXI0L3Q0eW00dmxHeVpSS1hCYVN2RFdGcHYxbm1BVFZ5eForSTQzcUtLWDVUODVFMDU0enl0bFBkc2V0bzhsUlcyWHVBPT06Y2FWMFl0aXY2UlZFejBVL1piZEQ2UT09'
  const fpath = path.resolve(__dirname, '../images', 'code.mp4')
  const writer = fs.createWriteStream(fpath)

  const response = await axios({
    url,
    method: 'GET',
    headers:{
        Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
    }
  }).then(res=>{
      console.log(res);
      return res
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
