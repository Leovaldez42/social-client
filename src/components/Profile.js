import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'
// MUI stuff
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
// Redux stuff
import { connect } from 'react-redux'

// Styling
const styles = {
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    };

export class Profile extends Component {
    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated}} = this.props
        // Basically this checks if user is authenticated, it it is it shows details which are given by the user, otherwise not shown. If the user is not authenticated it shows buttons to home page and login page
        let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary"/>
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>) : (
          // This for when the user is not signed it (not authenticated)
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Typography>
            </Paper>
        ) ) : (<p> Loading... </p>)

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))