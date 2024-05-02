import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement, ReactNode, useState } from "react";
import QuizCategoryIcon from "../../../components/quiz/QuizCategoryIcon";
import AvatarIcon from "../../profile/components/AvatarIcon";

interface TableColumnProps<T> {
  key: string;
  title: string;
  render?: (column: TableColumnProps<T>, item: T) => ReactElement;
}

interface DataTableProps<T extends { id: string; [key: string | number]: any }> {
  columns: TableColumnProps<T>[];
  rows: T[];
  onRowClick: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => void;
}

export default function DataTable<T extends { id: string; [key: string | number]: any }>({
  columns,
  rows,
  onRowClick,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAllClick = () => {
    if (selected.length === rows.length) {
      setSelected([]);
    } else {
      setSelected(rows.map((_, i) => i));
    }
  };

  const handleSelectClick = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const renderContent = (row: T, key: string) => {
    if (key === "category") {
      return (
        <QuizCategoryIcon
          category={row[key]}
          sx={{
            borderRadius: 0,
            pt: 1,
          }}
        />
      );
    }

    if (key === "Avatar") {
      return (
        <AvatarIcon first_name={row["first_name"]} last_name={row["last_name"]} size="small" />
      );
    }

    const keys = key.split(".");
    let value = row;
    for (const k of keys) {
      value = value[k];
    }

    return value;
  };

  const isRowValid = (row: T) => {
    return row && typeof row === "object" && "id" in row;
  };

  const displayRows = !rows?.length ? (
    <TableRow>
      <TableCell colSpan={columns.length + 1}>No data available</TableCell>
    </TableRow>
  ) : (
    rows.map((row, i) =>
      !isRowValid(row) ? null : (
        <TableRow
          key={i}
          onClick={(e) => onRowClick(e, row.id)}
          sx={{
            bgcolor: selected.includes(i) ? "accent.light" : "inherit",
            "&:hover": { bgcolor: "background.default", cursor: "pointer" },
          }}
        >
          <TableCell>
            <Checkbox checked={selected.includes(i)} onChange={() => handleSelectClick(i)} />
          </TableCell>
          {columns.map((column) => {
            return (
              <TableCell key={column.key}>
                {column.render
                  ? column.render(column, row)
                  : (renderContent(row, column.key) as ReactNode)}
              </TableCell>
            );
          })}
        </TableRow>
      )
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selected.length === rows.length}
                indeterminate={selected.length > 0 && selected.length < rows.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{displayRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
