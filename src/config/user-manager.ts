import { makeUserManager } from 'react-oidc';

const settings = {
    authority: 'http://localhost:5000',
    client_id: 'js',
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}/logout`,
    response_type: 'code',
    scope: 'openid profile movieApi offline_access',
    accessTokenExpiringNotificationTime: 30,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
}

const userManager = makeUserManager(settings);

userManager.events.addUserLoaded(function (loadedUser) {
    userManager.storeUser(loadedUser);
    console.warn('addUserLoaded', loadedUser);
});

userManager.events.addSilentRenewError(function (error) {
    console.error('addSilentRenewError', error);
});

userManager.events.addUserSignedOut(function () {
    console.warn('addUserSignedOut');
});

function getToken() {
    for (let i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i)?.startsWith('oidc.user:')) {
            let store = sessionStorage.getItem(sessionStorage.key(i)!);
            const parsedStore = JSON.parse(store!) as any;
            return parsedStore.access_token;
        }
    }
    return null;
}

function isLoggedIn() {
    let tokenExists = false;
    let claimsExists = false;
    let profileExists = false;

    for (let i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i)?.startsWith('oidc.user:')) {
            tokenExists = true;
            break;
        }
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'authorizationClaims') claimsExists = true;
        if (localStorage.key(i) === 'profile') profileExists = true;
    }

    return tokenExists && claimsExists && profileExists;
}

export { getToken, isLoggedIn, userManager, settings }