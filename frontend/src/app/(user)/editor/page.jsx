'use client'
import Editor from '@monaco-editor/react';

export default function Home() {
  return (
    <Editor height="100vh" defaultLanguage="javascript" defaultValue="// some comment" />
  )
}

//Page for vs code type editor