import React, { useRef, useState } from 'react'
import { Button } from 'antd'
import './upload.less'

function Upload () {
  const inputRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [imageSrc, setImageSrc] = useState('')

  // <input
  //   ref={inputRef}
  //   type='file'
  //   // name={name}
  //   accept='image/*'
  //   // multiple
  //   // 表示是否能够选择文件夹
  //   // webkitdirectory='true'
  //   onChange={handleChange}
  // />

  const fetch = (file) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('image', file)
    formData.append('user', '用户')
    formData.append('pass', '密码')

    xhr.onerror = (e) => {
      console.log('error', e)
    }

    xhr.onload = () => {
      console.log('success', xhr)
    }

    xhr.upload.onprogress = (e) => {
      console.log('progress', e)
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total * 100
        setProgress(percentComplete)
      } else {
        console.log('无法获取进度')
      }
    }

    xhr.open('post', 'http://localhost:3004/upload', true)

    xhr.send(formData)
    return xhr
  }
  const handleChange = (e) => {
    let { files } = e.target
    // console.log(files)
    files = [...files]
    fetch(files[0])
  }

  const loadImage = () => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.open('get', 'http://localhost:3004/json', true)
    xhr.onload = () => {
      // const reader = new FileReader()
      // reader.readAsDataURL(xhr.response)
      // reader.onload = () => {
      //   if (typeof reader.result === 'string') {
      //     setImageSrc(reader.result)
      //   }
      // }
    }
    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        console.log(e.total)
        var percentComplete = e.loaded / e.total * 100
        setDownloadProgress(percentComplete)
      } else {
        console.log('不支持进度')
      }
    }
    xhr.send()
  }

  return <div className='upload'>
    <input
      ref={inputRef}
      type='file'
      accept='image/*'
      webkitdirectory='true'
      onChange={handleChange}
    />
    <Button onClick={() => inputRef.current.click()} type='primary'>
      点击上传图片
    </Button>
    <div>
    上传进度条: {progress}% <progress value={progress} max='100'> {progress}% </progress>
    </div>
    <div>
      <Button onClick={() => loadImage()} type='primary'>
      点击下载图片
      </Button>
      下载进度条: {downloadProgress}% <progress value={downloadProgress} max='100'> {downloadProgress}% </progress>
      {!!imageSrc && <img src={imageSrc} />}
    </div>
  </div>
}

export default Upload
