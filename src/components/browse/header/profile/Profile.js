import React, { useState, useEffect, Redirect } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import {
    DefaultButton,
    Dialog,
    Text,
    Spinner,
    SpinnerSize
} from 'office-ui-fabric-react';

import style from './Profile.module.css';


const Profile = props => {

    const url =
        "https://movie-browser-api.herokuapp.com/api/profile"

    const opts = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem('JWT')
        }
    }

    const [hideDialog, setHideDialog] = useState(true);
    const [optionSelected, setOptionSelected] = useState("1");
    const [profile, setProfile] = useState(null);
    const [fetching, setFetching] = useState(true);
    useEffect(() => {
        async function fetchProfile() {
            await fetch(url, opts)
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        setProfile(data);
                    }
                });
            await setFetching(false);
        }
        fetchProfile();
    }, [])

    const closeHandler = () => setHideDialog(true);
    const openHandler = () => setHideDialog(false);
    const logoutHandler = () => {
        localStorage.removeItem('JWT');
        closeHandler();
    }

    if (!fetching && !profile) {
        return (
            <Redirect to="/" />
        );
    } else if (fetching) {
        return (
            <div className={style.wrapper}>
                <DefaultButton
                    text="Profile"
                    className={style.profile}
                    onClick={openHandler}
                />
                <Dialog
                    hidden={hideDialog}
                    onDismiss={closeHandler}
                    modalProps={{
                        isBlocking: false,
                        topOffsetFixed: true,
                        isDarkOverlay: true
                    }}
                    className={style.profileModal}
                >
                    <Spinner size={SpinnerSize.large} />
                </Dialog>
            </div>
        )
    } else {
        return (
            <div className={style.wrapper}>
                <DefaultButton
                    text="Profile"
                    className={style.profile}
                    onClick={openHandler}
                />
                <Dialog
                    hidden={hideDialog}
                    onDismiss={closeHandler}
                    modalProps={{
                        isBlocking: false,
                        topOffsetFixed: true,
                        isDarkOverlay: true
                    }}
                >
                    <section className={style.profileModal}>
                        <img src={profile.picture.large} alt="" className={style.profilePic} />
                        <Text>{profile.lastname}, {profile.firstname}</Text>
                        <Text>{profile.city}, {profile.country}</Text>
                        <Text>Joined: {profile.membership['date_joined']}</Text>
                        <br />
                        <RouterLink to="/" onClick={logoutHandler}>
                            <DefaultButton >Logout</DefaultButton>
                        </RouterLink>
                    </section>
                </Dialog>
            </div>
        )
    }

}

export default Profile;