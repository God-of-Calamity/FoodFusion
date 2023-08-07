import { Fragment } from 'react';
import { redirect } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import classes from './AboutPage.module.css';

function AboutPage() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let url = undefined;

    if (userData.type.toLowerCase() === 'customer') {
        url = '/userHome';
    } else if (userData.type.toLowerCase() === 'manager') {
        url = '/managerHome';
    } else if (userData.type.toLowerCase() === 'staff') {
        url = '/staffHome';
    }

    return (
        <Fragment>
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={url} />

                <div className={classes.pic}></div>

                <div className={classes.container}>
                    <p className={classes.info}>
                        Welcome to Food-Fusion! We are a premier online platform that connects food enthusiasts with their favorite
                        restaurants and empowers restaurant managers to efficiently manage their establishments. Our mission is to
                        provide a seamless and enjoyable food ordering experience for customers while supporting restaurant owners in
                        growing their businesses.
                        <br /><br />
                        At Food-Fusion, we understand that finding the perfect meal can be a delightful adventure. That's why we
                        have carefully curated a diverse selection of restaurants, ranging from local gems to popular chains, offering
                        an array of cuisines to satisfy every palate. Our user-friendly interface makes it effortless for you to explore,
                        discover, and order from a wide variety of restaurants in your area.
                        <br /><br />
                        For restaurant owners and managers, we offer a comprehensive suite of tools and services to streamline
                        operations and enhance customer engagement. Our platform provides you with an intuitive dashboard, enabling
                        you to effortlessly manage your restaurant's profile, menu, and online presence.
                        <br /><br />
                        Thank you for choosing Food-Fusion. We look forward to serving you and helping you explore the world of
                        culinary delights, one order at a time.
                    </p>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default AboutPage;