const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUsvSm5qT09KTkpxYi90NkRhei9DYWlFZlBJZFBaeEg2cGF3YjBVbk1VOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUV6bXMrT2FJeFEwSzNpVFp4VGJYdncxZUdSTlVjdXp6ZERwMGJQSld4OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QUl3ZU5wM2EwV3JidktLN21SVUk1ZUR6eUpEZEsxenNBcG1JQ2tuckdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRdHkyMWlyWnBxQ3NTVHlYNHNTWjZSdnV4dUJSYko1OTZCdzdxQVlndHk4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNBUVFKY2JqYkFHVlRNK3pTczFRODBuUm5LM29iOTN5VjVWUXJGNVZLbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhaMnFrbTQ0a081V3ZFeXVKN0tXOVJVT2VEVHlqRmlvT2xtWWt5Y0xmams9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01hK3o0SXMrYW5GK2lHb0dvUlhWR1dDTXBNNUthVWNmUDV4RHBwQklrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFlEa1VrVHhqMDFGbjFIVGVCSThsVUhZTHE2UHZmNWRtUDhoQW5EaVVRUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRMR243RlVuRHBqbGxlYXNEYnpMa1VBNmJNTlEwZTIxRjVTZGdyYTZIaHc5amVwRFA4RkYydW1pa0t6cktOUnJUWis2Znc3MWxRL2V1OGFmYkRmYUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6IjdRb3E0eGtoeHRUZlZBamlwOVg2Vy92bWs1cTFtU1lid25zYXdXNUY1S0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im1HZE12WGQyU1hDRXVVaXFpQWNNMlEiLCJwaG9uZUlkIjoiNGQzZDM3ZGEtZWJkNC00ODNiLThkOWYtZGFjMzYwMDkxNzJmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFBZWxEcDF0aWVRSE1qYzN0M1RTYUM4cFFERT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S2dYbVMxOHFMNDZsYmJoRnNlQTgyNENodXM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjkxOTUzOTE4MjE0ODo2OUBzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijg4NzQzMTE3NjMxNTY1OjY5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTNzL3RJRkVMZms3TUVHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2g2SzdKVjVEVjYrNFdTdVM1aGg2eVhIdlhFMzV4ajFnd1Z2bHVIemh5RT0iLCJhY2NvdW50U2lnbmF0dXJlIjoia3ZGbDV3YzJXL1Q1Z24rcVVUWE55VVRtMFF6TEhZQXNlN3ZGWHpOTDRGMmN1NkNnelQ2K3NXS0ZhKzdNaTgvZEYwUCs1QU1qaWhTQnZlRlNHUXByQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ikx5a0tGc2RLYVRSaTU1UVhienRQNWovZ0w1MWIyeFVzNG5WMG1YdDZaRytmUUVvekhSN3EzN0V6ZVFGd3JiM1NVem5vdzB0Z2xpZHIyMGsyMDZBNkJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5NTM5MTgyMTQ4OjY5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpJZWl1eVZlUTFldnVGa3JrdVlZZXNseDcxeE4rY1k5WU1GYjViaDg0Y2gifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0ODcwOTk1OCwibGFzdFByb3BIYXNoIjoiM2ZZd0NLIn0=',
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
