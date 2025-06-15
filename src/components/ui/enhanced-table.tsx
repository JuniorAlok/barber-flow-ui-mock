
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Column {
  header: string;
  key: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface EnhancedTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  hoverable?: boolean;
  striped?: boolean;
  compact?: boolean;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  columns,
  data,
  className,
  hoverable = true,
  striped = false,
  compact = false,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-border/50 bg-muted/30">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  'text-left font-semibold text-foreground',
                  compact ? 'p-2' : 'p-3',
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-border/30 transition-colors duration-200',
                'animate-fade-in',
                hoverable && 'hover:bg-muted/50 cursor-pointer',
                striped && index % 2 === 0 && 'bg-muted/20'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={cn(
                    'text-foreground',
                    compact ? 'p-2' : 'p-3',
                    column.className
                  )}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </TableCell>
              ))}
            </tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default EnhancedTable;
