import { makeStyles, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createMuiTheme, Typography} from "@material-ui/core";
import { FC } from "react";
import { IPkmnCard } from "../types";
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const buttonsTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
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
            <TableCell>Collection</TableCell>
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
              <TableCell>
                <ThemeProvider theme={buttonsTheme}>
                  <Button variant="contained" color="secondary"><b>-</b></Button>
                  <Typography>0</Typography>
                  <Button variant="contained" color="primary"><b>+</b></Button>
                </ThemeProvider>
              </TableCell>
              <TableCell>{item.rarity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PkmnCardsTable;