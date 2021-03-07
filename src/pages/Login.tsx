import React, { FC } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import googleButton from "../icons/googleButton.png";
import { useUser, googleSignIn } from '../utils/firebase';
import { Redirect } from 'react-router-dom';

const Login: FC = () => {

  const isLoggedIn = useUser();

  if (isLoggedIn) {
    return <Redirect to='/sets' />;
  }

  return (
    <Card>
        <CardContent>
            <Typography variant="h5" color="secondary">
              Pokémon TCG App
            </Typography>
            <Button onClick={() => googleSignIn()}>
              <img src={googleButton} alt="Sign in with Google" width="250px" />
            </Button>
          </CardContent>
    </Card>
  );
};

export default Login;