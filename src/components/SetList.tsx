import React, { FC, useState, useCallback, useEffect } from "react";
import PkmnSetsTable from "./PkmnSetsTable";
import {Typography, Grid} from "@material-ui/core";
import { IPkmnSet } from "../types";

const getSets = async (): Promise<any[]> => {
    const response = await fetch(`https://api.pokemontcg.io/v2/sets`);
    const sets = await response.json();
    return sets;
};

const SetList: FC = () => {
    
    // States to store data and for loading while cards are fetched
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IPkmnSet[]>();
      
    // Loads the sets
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const sets: any = await getSets();
            setData(sets.data);
        } finally {
          setLoading(false);
        }
    }, [setLoading]);
  
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
          {data ? (<PkmnSetsTable data={data}></PkmnSetsTable>) :
          (<Typography variant="h2">Loading...</Typography>)}
        </Grid>
      </Grid>
    );
  };
  
  export default SetList;