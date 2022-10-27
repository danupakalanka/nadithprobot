const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });


function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
	ALIVE_MSG: process.env.ALIVE_MSG === undefined ? 'Alive Now' : process.env.ALIVE_MSG,
	ALIVE_LOGO: process.env.ALIVE_LOGO === undefined ? `https://telegra.ph/file/5f2c2213e479a958564bd.jpg` : process.env.ALIVE_LOGO,

	PRO_LOGO: process.env.PRO_LOGO === undefined ? 'https://telegra.ph/file/8b8d49a533ae75d867f59.jpg' : process.env.PRO_LOGO,
	TV_LOGO: process.env.TV_LOGO === undefined ? 'https://telegra.ph/file/19c40ac52437d246524d3.jpg' : process.env.TV_LOGO,
	MY_LOGO: process.env.MY_LOGO === undefined ? 'https://telegra.ph/file/c8fa7a59b5dc23131d603.jpg' : process.env.MY_LOGO,
	WELCOME_LOGO: process.env.WELCOME_LOGO === undefined ? 'https://telegra.ph/file/21cecd447a3694560d001.jpg' : process.env.WELCOME_LOGO,

	FOOTER: process.env.FOOTER === undefined ? 'ⒸPowered By @NadithPro' : process.env.FOOTER,
	TVFOOTER: process.env.TVFOOTER === undefined ? 'ⒸPowered By @NadithPro' : process.env.TVFOOTER,

	OWNER_NAME: process.env.OWNER_NAME === undefined ? 'NadithPro' : process.env.OWNER_NAME,
	OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '94761327688' : process.env.OWNER_NUMBER,

	URL_WEBSITE: process.env.URL_WEBSITE === undefined ? 'Website 🖥️' : process.env.URL_WEBSITE,
	URL_WEBLINK: process.env.URL_WEBLINK === undefined ? 'http://www.nadith.pro' : process.env.URL_WEBLINK,
	URL_YOUTUBE: process.env.URL_YOUTUBE === undefined ? 'YouTube Channel 📺' : process.env.URL_YOUTUBE,
	URL_YTLINK: process.env.URL_YTLINK === undefined ? 'https://yt.nadith.pro' : process.env.URL_YTLINK,
	URL_INSTA: process.env.URL_INSTA === undefined ? 'Instagram 😎' : process.env.URL_INSTA,
	URL_INSTALINK: process.env.URL_INSTALINK === undefined ? 'http://insta.nadith.pro' : process.env.URL_INSTALINK,
	URL_FACEBOOK: process.env.URL_FACEBOOK === undefined ? 'Facebook 🤪' : process.env.URL_FACEBOOK,
	URL_FBLINK: process.env.URL_FBLINK === undefined ? 'https://fb.nadith.pro' : process.env.URL_FBLINK,
	URL_TELEGRAM: process.env.URL_TELEGRAM === undefined ? 'Telegram 🤤' : process.env.URL_TELEGRAM,
	URL_TGLINK: process.env.URL_TGLINK === undefined ? 'https://tg.nadith.pro' : process.env.URL_TGLINK,
	URL_WHATSAPP: process.env.URL_WHATSAPP === undefined ? 'WhatsApp 😏' : process.env.URL_WHATSAPP,
	URL_WALINK: process.env.URL_WALINK === undefined ? 'https://wa.nadith.pro' : process.env.URL_WALINK,
	URL_GITHUB: process.env.URL_GITHUB === undefined ? 'GitHub 👨🏻‍💻' : process.env.URL_GITHUB,
	URL_GITLINK: process.env.URL_GITLINK === undefined ? 'http://git.nadith.pro' : process.env.URL_GITLINK,
	URL_SPOTIFY: process.env.URL_SPOTIFY === undefined ? 'Spotify 💆🏻‍♂️' : process.env.URL_SPOTIFY,
	URL_SPOTIFYLINK: process.env.URL_SPOTIFYLINK === undefined ? 'https://spotify.nadith.pro' : process.env.URL_SPOTIFYLINK,
	URL_TVWEBSITE: process.env.URL_TVWEBSITE === undefined ? 'Website 🖥️' : process.env.URL_TVWEBSITE,
	URL_TVWEBLINK: process.env.URL_TVWEBLINK === undefined ? 'http://www.nadith.pro' : process.env.URL_TVWEBLINK,
	
	
	SONG_DOWN: process.env.SONG_DOWN === undefined ? 'Downloading Your Song...' : process.env.SONG_DOWN,
	SONG_UP: process.env.SONG_UP === undefined ? 'Uploading Your Song...' : process.env.SONG_UP,
	VIDEO_DOWN: process.env.VIDEO_DOWN === undefined ? 'Downloading Your Video...' : process.env.VIDEO_DOWN,
	VIDEO_UP: process.env.VIDEO_UP === undefined ? 'Uploading Your Video...' : process.env.VIDEO_UP,
	CAPTION: process.env.CAPTION === undefined ? 'ⒸPowered By @NadithPro' : process.env.CAPTION,
	FILE_DOWN: process.env.FILE_DOWN === undefined ? 'Downloading Your File...' : process.env.FILE_DOWN,
	FILE_UP: process.env.FILE_UP === undefined ? 'Uploading Your File...' : process.env.FILE_UP,


};
