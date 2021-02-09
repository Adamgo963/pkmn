import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React, { FC } from "react";
import { IPkmnSet } from "../types";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type PkmnCardsTableProps = {
  data: IPkmnSet[];
}

const PkmnCardsTable: FC<PkmnCardsTableProps> = ({data}) => {
      
  const classes = useStyles();
      
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Set Name</TableCell>
            <TableCell>Set Size</TableCell>
            <TableCell>Release Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item: IPkmnSet) => (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row"><Link to={`/sets/${item.id}`}>{item.name}</Link></TableCell>
              <TableCell>{item.total}</TableCell>
              <TableCell>{item.releaseDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PkmnCardsTable;