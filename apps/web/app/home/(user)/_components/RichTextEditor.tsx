import React from 'react';

interface RichTextEditorProps {
  onChange: (content: string) => void;
  content: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange, content }) => {
  return (
    <textarea
      className="h-[400px] w-full border-t-2 border-[#F6F7F9] p-4"
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default RichTextEditor;
