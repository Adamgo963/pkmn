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

const getQuantity = (cards: IPkmnCard[]) => {
  const quantities: IRarity = {total: 0, common: 0, uncommon: 0, rare: 0, holoRare: 0, amazingRare: 0, ultraRare: 0, secretRare: 0}
  cards?.forEach((item: IPkmnCard) => {
    switch(item.rarity) {
      case "Common":
        quantities.common++
        break;
      case "Uncommon":
        quantities.uncommon++
        break;
      case "Rare":
        quantities.rare++
        break;
      case "Rare Holo":
        quantities.holoRare++
        break;
      case "Amazing Rare":
        quantities.amazingRare++
        break;
      case "Rare Ultra":
        quantities.ultraRare++
        break;
      case "Rare Holo V":
        quantities.ultraRare++
        break;
      case "Rare Holo VMAX":
        quantities.ultraRare++
        break;
      case "Rare Secret":
        quantities.secretRare++
        break;
      case "Rare Rainbow":
        quantities.secretRare++
        break;
    }
    quantities.total++
  }
  )
  return quantities;
}

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
    const [totalRarity, setTotalRarity] = useState<IRarity>();

    const classes = useStyles();
      
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const cards: any = await getSetCards(setCode);
            setData(cards.data);
            const quantities: IRarity = getQuantity(cards.data);
            setTotalRarity(quantities);
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
                Common: 0/{totalRarity ? totalRarity.common : "Unknown"}
              </Typography>
              <Typography variant="h5" component="h2">
                Uncommon: 0/{totalRarity ? totalRarity.uncommon : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Rare: 0/{totalRarity ? totalRarity.rare : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Holo Rare: 0/{totalRarity ? totalRarity.holoRare : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Amazing Rare: 0/{totalRarity ? totalRarity.amazingRare : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Ultra Rare: 0/{totalRarity ? totalRarity.ultraRare : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Secret Rare: 0/{totalRarity ? totalRarity.secretRare : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Spolu: {totalRarity ? totalRarity.common + totalRarity.uncommon + totalRarity.rare + totalRarity.holoRare + totalRarity.amazingRare + totalRarity.ultraRare + totalRarity.secretRare : "Unknown"}
              </Typography>
              <Typography variant="h5">
                Collected: 0/{totalRarity ? totalRarity.total : "Unknown"}
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