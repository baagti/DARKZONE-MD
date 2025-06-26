const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');
const axios = require('axios');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot status",
    category: "main",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // System Information
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());
        const cpuModel = os.cpus()[0].model.split('@')[0];
        const platform = `${os.platform()} ${os.arch()}`;
        
        // Beautiful ASCII Art Design
        const status = `
┏━━━━━━━━━━━━━━━━━━━━┓
┃  🌟 *${config.BOT_NAME}* 🌟  ┃
┗━━━━━━━━━━━━━━━━━━━━┛

╭───────────────◇
│🎯 *Status:* Active & Running!
│👑 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 4.0.0
│🔮 *Prefix:* [ ${config.PREFIX} ]
╰───────────────◇

╭───────────────◇
│🖥️ *System Info:*
│• CPU: ${cpuModel}
│• RAM: ${memoryUsage}/${totalMemory} MB
│• Free: ${freeMemory} MB
│• Platform: ${platform}
│⏱️ *Uptime:* ${uptime}
╰───────────────◇

${config.DESCRIPTION || 'A powerful WhatsApp bot'}

✨ *Thank you for using  ${config.BOT_NAME}!* ✨`;

        // Simple message options without the problematic buffer call
        const messageOptions = {
            image: { 
                url: config.MENU_IMAGE_URL || 'https://i.imgur.com/8K7VhJt.jpg'
            },
            caption: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                newsletterJid: '120363416743041101@newsletter',
                isForwarded: true
            },
            quoted: mek
        };

        await conn.sendMessage(from, messageOptions);

    } catch (e) {
        console.error("Alive Command Error:", e);
        // Simple text reply if image fails
        const errorStatus = `
*${config.BOT_NAME} Status*

Status: Active ✅
Owner: ${config.OWNER_NAME}
Prefix: ${config.PREFIX}
Uptime: ${runtime(process.uptime())}

(Image not available)`;
        
        await reply(errorStatus);
    }
});
