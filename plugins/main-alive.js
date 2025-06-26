const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Get system information
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());
        
        // Create a more detailed status message
        const status = `
╭───〔 *🤖 ${config.BOT_NAME} STATUS* 〕───◉
│✨ *Bot is Active & Online!*
│
│👑 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 4.0.0
│🔧 *Prefix:* [ ${config.PREFIX} ]
│📱 *Mode:* ${config.MODE}
│
│💾 *Memory Usage:* ${memoryUsage}MB / ${totalMemory}MB
│🆓 *Free Memory:* ${freeMemory}MB
│🖥️ *Platform:* ${os.platform()} ${os.arch()}
│📡 *Host:* ${os.hostname()}
│⏱️ *Uptime:* ${uptime}
│
│${config.DESCRIPTION || 'A powerful WhatsApp bot'}
╰────────────────────◉`;

        // Prepare message options
        const messageOptions = {
            image: { 
                url: config.MENU_IMAGE_URL || 'https://i.imgur.com/example.jpg' // fallback image
            },
            caption: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 1000,
                isForwarded: true
            },
            quoted: mek
        };

        // Send the message
        await conn.sendMessage(from, messageOptions);

    } catch (e) {
        console.error("❌ Alive Command Error:", e);
        await reply(`⚠️ An error occurred: ${e.message}\nPlease try again later.`);
    }
});
