import { useState } from 'react';
import { FileText, Plus, Save, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  documents: { id: string; name: string; content: string }[];
  activeDocId: string;
  activeDocName: string;
  setActiveDocId: (id: string) => void;
  createNewDocument: () => void;
  renameDocument: (name: string) => void;
  deleteDocument: (id: string) => void;
}

export default function Header({
  documents,
  activeDocId,
  activeDocName,
  setActiveDocId,
  createNewDocument,
  renameDocument,
  deleteDocument
}: HeaderProps) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState(activeDocName);
  
  const handleRename = () => {
    renameDocument(newName);
    setIsRenameDialogOpen(false);
  };
  
  const handleOpenRenameDialog = () => {
    setNewName(activeDocName);
    setIsRenameDialogOpen(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">SimpleEdit</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                {activeDocName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {documents.map((doc) => (
                <DropdownMenuItem 
                  key={doc.id}
                  className={doc.id === activeDocId ? "bg-gray-100" : ""}
                  onClick={() => setActiveDocId(doc.id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="truncate">{doc.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleOpenRenameDialog}>
            Rename
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => deleteDocument(activeDocId)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
          
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          
          <Button onClick={createNewDocument}>
            <Plus className="h-4 w-4 mr-1" />
            New Document
          </Button>
        </div>
      </div>
      
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
          </DialogHeader>
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Document name"
            className="my-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}