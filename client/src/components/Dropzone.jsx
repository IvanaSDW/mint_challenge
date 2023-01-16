import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { BiCloudUpload } from 'react-icons/bi'

const Dropzone = ({ setFiles }) => {

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log('files: ', acceptedFiles)
      if (acceptedFiles) setFiles(acceptedFiles)
      else setFiles(null)
    },
    [],
  )


  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'model/gltf-binary': [],
      'audio/mpeg': [],
      'video/mp4': [],
      'video/mpeg': [],
      'video/x-msvideo': [],
      'audio/wav': [],

    }
  })

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div {...getRootProps({ className: "dropzone" })} className="border-dashed border-blue-400 border-2 py-20 bg-slate-100">
      <input className="input-zone" {...getInputProps()} />
      <div ><BiCloudUpload size='3rem' className='m-auto' /></div>
      <div className="text-center">
        {isDragActive ? <p>Drop the files here...</p> :
          <p className="dropzone-content">
            Drag’n’drop some files here, or click to browse.
          </p>}
      </div>
      <aside className="italic text-base text-slate-600 p-2">
        <ul>{files}</ul>
      </aside>
    </div>
  )
}

export default Dropzone