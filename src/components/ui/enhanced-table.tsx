
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Column {
  header: string;
  key: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface EnhancedTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  hoverable?: boolean;
  striped?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  columns,
  data,
  className,
  hoverable = true,
  striped = false,
  compact = false,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
}) => {
  if (loading) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden management-card', className)}>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-border/50 bg-muted/20 hover:bg-muted/20">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    'text-left font-semibold text-foreground bg-transparent',
                    compact ? 'p-2' : 'p-4',
                    column.className
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <button className="text-muted-foreground hover:text-foreground">
                          ↑
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          ↓
                        </button>
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className={cn(
                  'border-b border-border/20 transition-all duration-200',
                  'animate-fade-in',
                  hoverable && 'hover:bg-muted/30 cursor-pointer hover-lift',
                  striped && index % 2 === 0 && 'bg-muted/10'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn(
                      'text-foreground',
                      compact ? 'p-2' : 'p-4',
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default EnhancedTable;
