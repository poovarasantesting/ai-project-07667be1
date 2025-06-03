import { useState, useEffect } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {
  const [editorContent, setEditorContent] = useState(content);
  
  // Sync with parent component
  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    onChange(e.target.value);
  };

  const formatText = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    const selection = document.getSelection();
    if (selection && selection.toString()) {
      // This is just for visual feedback - actual formatting would require a rich text editor
      console.log(`Applied ${command} to: "${selection.toString()}"`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-gray-50 p-2 border-b border-gray-200 flex flex-wrap gap-2 items-center">
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => formatText('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => formatText('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => formatText('underline')}
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 mx-1" />
        
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => formatText('justifyLeft')}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => formatText('justifyCenter')}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => formatText('justifyRight')}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 mx-1" />
        
        <Select defaultValue="normal">
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="large">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <textarea
        className="w-full p-4 min-h-[400px] focus:outline-none resize-none font-sans text-gray-800"
        value={editorContent}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
      
      <div className="bg-gray-50 p-2 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
        <div>
          {editorContent.length} characters
        </div>
        <div>
          {editorContent.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>
    </div>
  );
}