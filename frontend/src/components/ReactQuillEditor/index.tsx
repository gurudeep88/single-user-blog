import './index.css';
import { QuillFormats, QuillModule } from '@/helpers/quill'
import dynamic from 'next/dynamic';
import React from 'react'
import ReactQuill from 'react-quill-new';


const ReactQuill = dynamic(() => import('react-quill-new'), {ssr: false});
import 'react-quill-new/dist/quill.snow.css';

const ReactQuillEditor = ({value, placeholder, onChange}: {value: any; placeholder: string; onChange: any}) => {
  return (
    <ReactQuill
        modules={QuillModule}
        formats={QuillFormats}
        value={value} 
        placeholder={placeholder}
        onChange={onChange}
    />
  )
}

export default ReactQuillEditor