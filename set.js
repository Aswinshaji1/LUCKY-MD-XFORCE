const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUpBV3JNWlRuRW1raTdra3FFYy9yNExMT0pXUmVjcW9sUmUwY2hzZHIwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUdTNW03amo4WnRXWXNRT3VwTVZhRmJ4Z3YxYjRxdVhSV25Pc2NVSDdBOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SnBSRWo0OE9xdEplVHFrRjNteXZBMnBoWXlQRVIzSG9GSUhvRWR3Qkd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1bms2aVE1TkdmTnkrTllqNG9BdStKYnFhakFRb2wxYlJIWFREY1JoZHdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhLcFkvOElxeTFsSjJZbk56TmpnZlNhK3crZjQxeDdQUHIvbXdweXJDRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ4a2dEZlIwcUlFMi9uVTV5U1N1aGRUZmhQL3ZmNGdtbEg2bmdZNlBqMnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0dqdC84TW9ycTdNcUZxUHFmT0FMVUx2OXUyeVA4ejlTTTRlNWFRVG9sZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjhzSTNXcFFFZEY0RjdRcDg3dHJhSEgwR21EUDVqREU2ZUJSNkRxdW1RMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldydFo1RHRiQURpdnNCZFNFMGFkSEZsVXJ4cW1mOVUzYWpWbnFUODZyYW1kR2JNQXU4VjltNDRMYUxzZ0NWd1Q3U1R3eWtNQjRJUHp6bll5OVN1WkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTcsImFkdlNlY3JldEtleSI6IjVnek13L3k2YTBsU2pTTHZ3cmtNNDNrd3FFUVFCejZXZXJieDdVbUJsMFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkNUVjl0UTljU0ZLMWIxVEVlMGhoOGciLCJwaG9uZUlkIjoiNGJiZDFmZWUtOTk5Ni00ZTg2LWJmOGItZjIwMjE0NmZlZjRlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJGdUllRmlIVHNwZjkvOUxvcnphMnE0eVlmVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHblV5REJNQWpjT1hUVjJyOUt1bGVMcHYwZGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjkxNzAxMjQ1Mjk3Mjo5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA4OTI1Mjg2NDA0MTQ0OjlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLV0dtczhIRUkyYy84RUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBdURtRHZBOU1iaHVIWXJpT3RZa2daSldhSktFRlFzQVNpRm8zbGkrM0g0PSIsImFjY291bnRTaWduYXR1cmUiOiI1bmhyRWFCRTBCaElCaHRwMktzdWRBTzVKdWVjbGNWY0xwVVhpZ1NUdDhlczB3VEl5RTl6UUs3Vm1Ob2dVY1BUVGFBL2pEdlVzbm1UR1lTYmlrQlFBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoib0xKZUhDVnRYb2cvNDE1SkVvbSs4SHpoUWJvODVDb29GRTNBRUlncGo3bzkrUTJvK0txZFlxSW83ak12MTZ1VHAvR0hiUm9uMUk4WlhQUXVLcDhpQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTcwMTI0NTI5NzI6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRTGc1Zzd3UFRHNGJoMks0anJXSklHU1ZtaVNoQlVMQUVvaGFONVl2dHgrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDkwMTE5OTMsImxhc3RQcm9wSGFzaCI6IjRaUlA2UyIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ1RBIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255752593977",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️LUCKY-MD-XFORCE☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "☢️LUCKY-MD-XFORCE☢️",
    BOT : process.env.BOT_NAME || '☢️LUCKY-MD-XFORCE☢️⁠',
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
