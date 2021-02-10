import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import { IPkmnCard } from "../types";


type PkmnCardsGridProps = {
  data: IPkmnCard[];
}

const PkmnCardsGrid: FC<PkmnCardsGridProps> = ({data}) => {
            
  return (
    <Grid container>
        {data.map((item :IPkmnCard) => (
            <Grid item key={item.id} lg={3} md={4} sm={6} xs={12}>
                <img alt={item.name} src={item.images.large} width="240px" height="330px"/>
            </Grid>
        ))}
    </Grid>
  );
}

export default PkmnCardsGrid;