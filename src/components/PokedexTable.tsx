import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import { FC } from "react";
import {IPokedexEntry } from "../types";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type PokedexTableProps = {
  data: IPokedexEntry[];
}

const PokedexTable: FC<PokedexTableProps> = ({data}) => {
      
  const classes = useStyles();
      
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pokedex #</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Collected</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((item: IPokedexEntry) => (
          <TableRow>
            <TableCell component="th" scope="row">{item.number}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PokedexTable;