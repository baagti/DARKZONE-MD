const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

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
        const cpuModel = os.cpus()[0].model;
        const platform = `${os.platform()} ${os.arch()}`;
        
        // Beautiful ASCII Art Design
        const status = `
╔═══════════════════════
║  🚀 *${config.BOT_NAME} STATUS* 🚀
╟───────────────────────
║  🌟 *Bot Status:* Active & Online!
║  
║  👑 *Owner:* ${config.OWNER_NAME}
║  📌 *Prefix:* [ ${config.PREFIX} ]
║  🛠️ *Version:* 4.0.0
║  🔧 *Mode:* ${config.MODE}
║  
║  🖥️ *System Info:*
║  • CPU: ${cpuModel}
║  • RAM: ${memoryUsage}MB / ${totalMemory}MB
║  • Free: ${freeMemory}MB
║  • Platform: ${platform}
║  • Uptime: ${uptime}
║  
║  📍 *Description:*
║  ${config.DESCRIPTION || 'A powerful WhatsApp bot'}
╚═══════════════════════
✨ *Powered by ${config.BOT_NAME}* ✨`;

        // Message Options with Stylish Formatting
        const messageOptions = {
            image: { 
                url: config.MENU_IMAGE_URL || 'https://i.imgur.com/8K7VhJt.jpg' // default aesthetic image
            },
            caption: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `${config.BOT_NAME} Status`,
                    body: "Click here to interact with me!",
                    thumbnail: await (await fetch(config.MENU_IMAGE_URL)).buffer(),
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: config.WEBSITE || 'https://github.com/your-repo'
                }
            },
            quoted: mek
        };

        await conn.sendMessage(from, messageOptions);

    } catch (e) {
        console.error("✨ Alive Command Error:", e);
        await reply(`❌ Oops! Something went wrong:\n${e.message}\n\nPlease try again later.`);
    }
});
