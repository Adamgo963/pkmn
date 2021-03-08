import { FC } from "react";
import {Typography, Grid} from "@material-ui/core";
import Pokedex from "../utils/pokedex.json"
import PokedexTable from "./PokedexTable";

const PokedexList: FC = () => {





  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xl={6} lg={6} sm={8} xs={12}>
        {Pokedex ? (<PokedexTable data={Pokedex}></PokedexTable>) :
        (<Typography variant="h2">Loading...</Typography>)}
      </Grid>
    </Grid>
  );
};
  
  export default PokedexList;