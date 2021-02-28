import React, { FC, useState, useCallback, useEffect } from "react";
import PkmnCardsTable from "./PkmnCardsTable";
import {Typography, Grid, Button, makeStyles} from "@material-ui/core";
import { IPkmnCard, IView } from "../types";
import PkmnCardsGrid from "./PkmnCardsGrid";
import { Link } from "react-router-dom";

const getSetCards = async (setCode: string): Promise<any[]> => {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/?q=set.id:${setCode}`);
    const cards = await response.json();
    return cards;
};

type CardListProps = {
  setCode: string;
}

const useStyles = makeStyles({
  link: {
    color: "white",
    textDecoration: "none"
  },
});

const CardList: FC<CardListProps> = ({setCode}) => {
    
    // States to store data and for loading while cards are fetched
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IPkmnCard[]>();
    const [view, setView] = useState<IView>('List');

    const classes = useStyles();
      
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

    const changeView = () => {
      view === 'List' ? setView('Grid') : setView('List');
    }
  
    if (loading) {
      return <Typography variant="h2">Loading...</Typography>;
    }
    
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xl={6} lg={6} sm={12} xs={12}>
          <Button variant="contained" color="primary"><Link className={classes.link} to={`/sets/`}>Back to sets list</Link></Button>
          <Button variant="contained" color="primary" onClick={() => changeView()}>Switch View</Button>
          {data ? 
            (view === 'List' ? 
              <PkmnCardsTable data={data}></PkmnCardsTable> 
              : <PkmnCardsGrid data={data}></PkmnCardsGrid>) 
            : (<Typography variant="h2">Loading...</Typography>)}
        </Grid>
      </Grid>
    );
  };
  
  export default CardList;