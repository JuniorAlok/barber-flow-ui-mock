
import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Camera, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  showUploadButton?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  className,
  size = 'md',
  name = '',
  showUploadButton = true
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert to base64 for demo purposes
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      <div className="relative">
        <Avatar className={cn(sizeClasses[size], 'border-2 border-primary/20')}>
          <AvatarImage src={value} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary text-lg">
            {name.charAt(0) || <Camera className="w-6 h-6" />}
          </AvatarFallback>
        </Avatar>
        
        {value && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={triggerFileSelect}
          disabled={isUploading}
          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 border-primary/30"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </div>

      {showUploadButton && (
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileSelect}
          disabled={isUploading}
          className="w-full max-w-xs"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Enviando...' : 'Escolher Foto'}
        </Button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export { ImageUpload };
