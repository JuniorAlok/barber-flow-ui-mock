
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, submitStatus }) => (
  <div className="flex items-center gap-4">
    <Button
      type="submit"
      disabled={isSubmitting}
      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium transition-all duration-300 min-w-[140px]"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Enviando...
        </>
      ) : (
        'Enviar Formulário'
      )}
    </Button>

    {submitStatus === 'success' && (
      <div
        className="flex items-center gap-2 text-green-600 animate-scale-in"
      >
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Enviado com sucesso!</span>
      </div>
    )}
    
    {submitStatus === 'error' && (
      <div
        className="flex items-center gap-2 text-red-600 animate-scale-in"
      >
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Erro ao enviar</span>
      </div>
    )}
  </div>
);
