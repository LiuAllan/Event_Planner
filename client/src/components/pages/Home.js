import React, {useContext, useEffect} from 'react'
// Components
import GuestForm from '../guests/GuestForm'
import GuestCounter from '../guests/GuestCounter'
import GuestFilter from '../guests/GuestFilter'
import GuestSearch from '../guests/GuestSearch'
import Guests from '../guests/Guests'
import Grid from '@material-ui/core/Grid';
// Context
import AuthContext from '../../context/authContext/authContext';

const Home = () => {

  const { getUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, [])

  return (
    <div className="app-container">
    <Grid container justify="center" spacing={1}>
      <Grid item lg={2} md={3}>
        <GuestFilter />
      </Grid>
      <Grid item lg={3} md={3}>
        <GuestSearch />
      </Grid> 
    </Grid>
      <div className="main">
        <Grid container justify="center">
          <Grid item lg={8} xs={8}>
              <GuestCounter />
          </Grid>
          <Grid item lg={8} xs={8}>
            <GuestForm />
          </Grid>

        </Grid>
      </div>
      <Guests />
    </div>
  )
}

export default Home