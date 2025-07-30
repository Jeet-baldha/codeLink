import React from 'react';
import { Code2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditorLayout = ({ children }) => {
  const roomId = useParams().id;
  const language = useSelector((state) => state.user.language);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CodeLink
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Room ID:</span>
              <span className="ml-2 font-mono text-sm text-foreground">{roomId}</span>
            </div>
            <div className="px-4 py-2 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Language:</span>
              <span className="ml-2 text-sm text-foreground capitalize">{language}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default EditorLayout; 