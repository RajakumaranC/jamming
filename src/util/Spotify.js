const clientId = "fa43a559e7c6472fa790b78d4f807adf";
const redirectUri = "http://localhost:3000";
let accessToken;
const Spotify = {

    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else{
            const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUri;
        }
    }



}


export default Spotify;