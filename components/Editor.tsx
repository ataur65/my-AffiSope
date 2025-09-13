'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};

export default Editor;