const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0FqUUozUWlBdkk5bTM0eG1OaEI0OE9aUzFSbyt3amFTYmY4bElKU3BVYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGVKK1Y1bWxyNHp1MzJiNWx1NHdKb0JGQmU5bDhwc2JPYzFmTG1xSDJIQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4SXBGNnlTVjRBR2UzbTlFZjFwZ01qL3JHV0VVQ3BROXk4NnlNZjcwVGtZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpVlBaRXo4MFdza0VQd3NjSjJRdmRDd1pxK1JHaXl5ODVHMVlXVzErZkN3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdFZzRpRlExVkg4WTdneDc0MWNoc1lGeWFmQnNhU3ozTFpkaTQ0bEUvSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZYMG51YjRGL0Q0SUE5d0dsRVFhV3JncStQOGZvaFRqNlJEQmFFMVorZ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU01ZRTh6eGk2d2J0a0tJamMzS0xGeCt1eC9nT0o5NHdvVGozbllNbHcyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXVYbWFtTXZvK2gvNWlwWmZNbUdhaWRMSzRmcENBb2dWdUpHcHJPOE1Ccz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRlQ21remQyVnIzcWdHYzdlWlFzcGRWRGNzc2ZwMC9uVnE1L1BEWW53cS9SU2FXR1EzVUhBcHVpbXNXam85aXRhUEdsRzg1QUFVNWw1bEd4bHFEbGhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ2LCJhZHZTZWNyZXRLZXkiOiIwNlZzcERjbTNxd3A0Z3N4U2ZKR1JqQ05OWkUvdFpUOGRiRUdwRjZ3eC9ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTUzOTE4MjE0OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEOUI4RjU5NzczMEVBRDdDNUM4RTA2MUYwRkM0ODgzMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNjg0MjY1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk1MzkxODIxNDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0FEMDFDQzVBQUVGQ0U0QkNBNzJGMDg0QkE0RkJCMDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTY4NDI4NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiN1RGNzB1YWhUMDJZV1VpbDZfSDRrQSIsInBob25lSWQiOiJmMjNmOTZkOS1mMWI4LTQzZDYtYTY0MS04MTAwZGUwNDFhZGEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFFNVWNBb203TUNJaVJmMS9NbmZySFIvbGlJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InEzWXZuYjBVdC9pcjVubU55UkF1eElrcXNLOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGUkVERVpSQSIsIm1lIjp7ImlkIjoiOTE5NTM5MTgyMTQ4Ojk3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiODg3NDMxMTc2MzE1NjU6OTdAbGlkIiwibmFtZSI6IuGliuqrgOqqgOqqruqqkeqqrvCdmLPPgeqrnfCfjYPwn6SNIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPWHMvdElGRUpPcG9zTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJraDZLN0pWNURWNis0V1N1UzVoaDZ5WEh2WEUzNXhqMWd3VnZsdUh6aHlFPSIsImFjY291bnRTaWduYXR1cmUiOiJJOXBCbTNaYmZpdzBWTEEwTzhiMUdQb0Q2TFF2S0RxV3YzeWxvNm11YUxnR3FjSElENHFTTldPNmJ5UW1rbjRPb0d2bnZOSlUrTXZUYUNGMU9hZWdBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSy94bERwbUZBbHNXdEYzdEZsMEpTSUJabVpMMzZSQTVYb3hsZkRnMGdhUkRKMm5ZaVlSeHRjeVhhK3FvR2VDVUpVNlE2RTNqQmc4MHVXZStCVU04Z2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTk1MzkxODIxNDg6OTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkllaXV5VmVRMWV2dUZrcmt1WVllc2x4NzF4TitjWTlZTUZiNWJoODRjaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxNjg0MjU3LCJsYXN0UHJvcEhhc2giOiIzZll3Q0siLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0yOCJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "᥊ꫀꪀꪮꪑꪮ𝘳ρꫝ🍃🤍",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "919539182148",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️LUCKY-MD-XFORCE☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "᥊ꫀꪀꪮꪑꪮ𝘳ρꫝ🍃🤍",
    BOT : process.env.BOT_NAME || '᥊ꫀꪀꪮꪑꪮ𝘳ρꫝ🍃🤍⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
