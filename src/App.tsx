import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import TextEditor from '@/components/TextEditor';
import Header from '@/components/Header';

export default function App() {
  const [documents, setDocuments] = useState<{ id: string; name: string; content: string }[]>([
    { id: '1', name: 'Untitled Document', content: '' }
  ]);
  const [activeDocId, setActiveDocId] = useState('1');

  const { toast } = useToast();

  const activeDocument = documents.find(doc => doc.id === activeDocId) || documents[0];

  const updateDocumentContent = (content: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === activeDocId ? { ...doc, content } : doc
      )
    );
  };

  const createNewDocument = () => {
    const newId = String(Date.now());
    const newDoc = { id: newId, name: 'Untitled Document', content: '' };
    setDocuments([...documents, newDoc]);
    setActiveDocId(newId);
    toast({
      title: "New document created",
      description: "Started a fresh document for you.",
    });
  };

  const renameDocument = (newName: string) => {
    if (!newName.trim()) return;
    
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === activeDocId ? { ...doc, name: newName } : doc
      )
    );
    toast({
      title: "Document renamed",
      description: `Renamed to "${newName}"`,
    });
  };

  const deleteDocument = (id: string) => {
    if (documents.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    setDocuments(docs => docs.filter(doc => doc.id !== id));
    
    if (id === activeDocId) {
      setActiveDocId(documents.filter(d => d.id !== id)[0].id);
    }
    
    toast({
      title: "Document deleted",
      description: "Document has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        documents={documents}
        activeDocId={activeDocId}
        setActiveDocId={setActiveDocId}
        createNewDocument={createNewDocument}
        renameDocument={renameDocument}
        deleteDocument={deleteDocument}
        activeDocName={activeDocument.name}
      />
      
      <main className="flex-1 container mx-auto p-4">
        <TextEditor 
          content={activeDocument.content} 
          onChange={updateDocumentContent} 
        />
      </main>
      
      <Toaster />
    </div>
  );
}