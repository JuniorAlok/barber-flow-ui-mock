
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, X, Edit2 } from 'lucide-react';

interface InlineEditProps {
  value: string | number;
  onSave: (value: string | number) => void;
  type?: 'text' | 'number' | 'textarea';
  placeholder?: string;
  className?: string;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onSave,
  type = 'text',
  placeholder,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (type !== 'textarea') {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [isEditing, type]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {type === 'textarea' ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[60px]"
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(type === 'number' ? Number(e.target.value) : e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
        )}
        <Button size="sm" onClick={handleSave} className="p-1">
          <Check className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel} className="p-1">
          <X className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`group flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded ${className}`}
      onClick={() => setIsEditing(true)}
    >
      <span className="flex-1">{value || placeholder}</span>
      <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default InlineEdit;
