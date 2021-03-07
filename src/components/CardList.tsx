import React, { FC, useState, useCallback, useEffect } from "react";
import PkmnCardsTable from "./PkmnCardsTable";
import {Typography, Grid, Button, makeStyles, Card, CardContent} from "@material-ui/core";
import { IPkmnCard, IRarity, IView } from "../types";
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
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IPkmnCard[]>();
    const [view, setView] = useState<IView>('List');
    const [totalRarity, setTotalRarity] = useState<IRarity>({common: 0, uncommon: 0, rare: 0, holoRare: 0, amazingRare: 0, ultraRare: 0, secretRare: 0});

    const classes = useStyles();
      
    const loadData = useCallback(async () => {
        setLoading(true);
        setTotalRarity({common: 0, uncommon: 0, rare: 0, holoRare: 0, amazingRare: 0, ultraRare: 0, secretRare: 0});
        try {
            const cards: any = await getSetCards(setCode);
            setData(cards.data);
        } finally {
          setLoading(false);
        }
    }, [setLoading, setCode]);
  
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
          <Card>
            <CardContent>
              <Typography variant="h5">
                Common: 0/{totalRarity.common}
              </Typography>
              <Typography variant="h5" component="h2">
                Uncommon: 0/{totalRarity.uncommon}
              </Typography>
              <Typography variant="h5">
                Rare: 0/{totalRarity.rare}
              </Typography>
              <Typography variant="h5">
                Holo Rare: 0/{totalRarity.holoRare}
              </Typography>
              <Typography variant="h5">
                Amazing Rare: 0/{totalRarity.amazingRare}
              </Typography>
              <Typography variant="h5">
                Ultra Rare: 0/{totalRarity.ultraRare}
              </Typography>
              <Typography variant="h5">
                Secret Rare: 0/{totalRarity.secretRare}
              </Typography>
            </CardContent>
          </Card>
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