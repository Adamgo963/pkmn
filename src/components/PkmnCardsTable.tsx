import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import { FC } from "react";
import { IPkmnCard } from "../types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type PkmnCardsTableProps = {
  data: IPkmnCard[];
}

const PkmnCardsTable: FC<PkmnCardsTableProps> = ({data}) => {
      
  const classes = useStyles();
      
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Card #</TableCell>
            <TableCell>Card Name</TableCell>
            <TableCell>Rarity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item: IPkmnCard) => (
            <TableRow key={item.number}>
              <TableCell component="th" scope="row">
                {item.number}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.rarity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PkmnCardsTable;