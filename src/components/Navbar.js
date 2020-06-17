import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
// MUI STUFF
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

export class Navbar extends Component {
    render() {
        const authenticated = this.props
        return (
            // Basic thing done here is that if the user is authenticated, it shows particular things if not.
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        // This is if user is authenticated.
                        <Fragment>
                            <MyButton tip="Create a post">
                                <AddIcon color="primary"/>  {/* Primary will be white due to svg */}
                            </MyButton>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="primary" />
                                </MyButton>
                            </Link>
                            <MyButton tip="Notification">
                                <Notifications color="primary" />
                            </MyButton>
                        </Fragment>
                    )
                    : (
                        // This is if user is not authenticated.
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login"> Login </Button>
                            <Button color="inherit" component={Link} to="/"> Home </Button>
                            <Button color="inherit" component={Link} to="/signup"> Signup </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
