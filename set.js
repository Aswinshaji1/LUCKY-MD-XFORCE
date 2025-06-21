const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0IxUldoNzVvejVLQmhxdTZDOEJHemhFb3BFMHQwNzZQQmM0ZVVKY21rTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3AyMWx2T3EwZXMwSlJTbUd5b0o5d0pVczNYT0lHTWM4YmpXaXAzcW9EVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrT09OYTNMYmdQNU5jR085d1c4Wk9OSTVOYmhrbzhjZlB5bjJuaW5GSTJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHL0ZQdWZDbkpZRCtjRHY4WG9ZQzNwQUxjZ2JHM3dxOHVic3hsenVEdWpzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1PRmtXVURteGNsVm93Z0pYYUtRaHZHbUFsVGIxQ3I4ZVpJanM2cVNlMG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRqM3pYZTRWQ2Z6WVk5RUZZSUJjQy94M0FDckI0a2pHUzR5c25WWExXRnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUJrOUN6RGo2R1lVVEs0MkR1N3ROVEpsMzNRbGpSSW9rVnEyR0JiYU4wRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFN6ZmFGWnRqWlMvMi9XMkpibjdOWUMybFVETjMxdzUxZ0swUmV1YjBrOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdDVlFnU1ppRnhmSzN2ZkF2MXFsVEVKWDc5Tk1kSUhzVDFHY1k4NFQwS1I5c0tGSFh3TnRSeE92LzJqNHJyWXducTVWSno4cnhjc3M5ek5JMlFLc0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6Ik4xK240N0h2L21QSTBDOFFqemMydzhOVVpHREZwRy9qUVBvTnlTcmhDSDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5NTM5MTgyMTQ4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVFNUMzQkQ2MzU0NjE5ODcyNjQzOUJERjkzODc4REY0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA1MDQyNTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTUzOTE4MjE0OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFRDJEMjY3NzZGRjkxOTk4NjRENjM1MDYzMUFGQjMzNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNTA0MjY4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk1MzkxODIxNDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEU2N0VDREE1MTRGQTIwOTM1QUE0QTY2MzBBQzI2M0UifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDUwNDI4NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5NTM5MTgyMTQ4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjgxRkIwQkI3QkUzRUYxRjREOTk1RDZBODlGNjhEOUEzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA1MDQyOTd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikh1TFFERE8tU3R5bWVobnE2Sm1MWVEiLCJwaG9uZUlkIjoiYWYzMjBiMGEtZmI5ZC00OTNkLWFjNDUtMzBjMmNiMDVhMjIwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhyTVVXVW93SFo0VGM4MU5BakY3K0NYMzBkTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2eGt5Wkliem9hNzFiQnhQWlhic3VveDI1eTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjkxOTUzOTE4MjE0ODo4M0BzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijg4NzQzMTE3NjMxNTY1OjgzQGxpZCIsIm5hbWUiOiLhtZfKsOG1ifCdkLHwnZCe8J2Qp/CdkKjwnZCm8J2QqPCdkKvwnZCp8J2QoSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnZzL3RJRkVLeW0yc0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2g2SzdKVjVEVjYrNFdTdVM1aGg2eVhIdlhFMzV4ajFnd1Z2bHVIemh5RT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTWRFdmJrSHBUaXBmZC9oaDlsdXRwOXRjOHNPenFVNUppTDNsRlA3WnFjaHk1amg3M0FsMWpBZ1ZQYnFUNysyRjFUV09mZ3htOWc1ZWszbWhWTXBpQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IlVBb1RxQTNKYzJpUlExOVowNFdxZmY2Q1V2NEhhMzFjaFZBcURwTHhHS0hKLzd0ZWVmaWtvRHBNLzU1TTJYbFNkUmxScGRQbGJDam0wVkxONlpuUERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5NTM5MTgyMTQ4OjgzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpJZWl1eVZlUTFldnVGa3JrdVlZZXNseDcxeE4rY1k5WU1GYjViaDg0Y2gifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDUwNDI1MCwibGFzdFByb3BIYXNoIjoiM2ZZd0NLIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCNmwifQ==',
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
