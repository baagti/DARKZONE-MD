const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "menu3",
    desc: "Display main menu",
    category: "menu",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const menuText = `👋 Hello *${pushname || 'there'}*,
🤖 *${config.BOT_NAME} Main Menu*

🔧 *Mode:* ${config.MODE}
👤 *Owner:* ${config.OWNER_NAME}
📦 *Version:* 3.0.0 Beta
🔣 *Prefix:* ${config.PREFIX}

💡 Choose a category below:`;

        const buttons = [
            { buttonId: `${config.PREFIX}allmenu`, buttonText: { displayText: '📜 All Menu' }, type: 1 },
            { buttonId: `${config.PREFIX}groupmenu`, buttonText: { displayText: '👥 Group Menu' }, type: 1 },
            { buttonId: `${config.PREFIX}ownermenu`, buttonText: { displayText: '👑 Owner Menu' }, type: 1 }
        ];

        const buttonMessage = {
            image: { url: config.MENU_IMAGE_URL },
            caption: menuText,
            footer: '🔘 Powered by ' + config.BOT_NAME,
            buttons: buttons,
            headerType: 4, // 1=Text, 2=Image, 3=Video, 4=Location
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

        // Send Audio
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        await conn.sendMessage(
            from,
            {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: true
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});
