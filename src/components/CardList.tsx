import React, { FC, useState, useCallback, useEffect } from "react";
import PkmnTable from "./PkmnTable";
import {Typography, Grid} from "@material-ui/core";
import { IPkmnCard } from "../types";

const getSetCards = async (setCode: string): Promise<IPkmnCard[]> => {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/?q=set.id:${setCode}`);
    const cards = await response.json();
    return cards;
};

const CardList: FC = () => {
    
    // States to store data and for loading while cards are fetched
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IPkmnCard[]>();
    const setCode: string = "base1"
      
    // Loads the set cards
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const cards: any = await getSetCards(setCode);
            setData(cards.data);
        } finally {
          setLoading(false);
        }
    }, [setLoading, setCode]);
  
    // Calls the loadData() while the component is rendered
    useEffect(() => {
      loadData();
    }, [loadData]);
  
    if (loading) {
      return <Typography variant="h2">Loading...</Typography>;
    }
     
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xl={6} lg={6} sm={8} xs={12}>
          {data ? (<PkmnTable data={data}></PkmnTable>) :
          (<Typography variant="h2">Loading...</Typography>)}
        </Grid>
      </Grid>
    );
  };
  
  export default CardList;