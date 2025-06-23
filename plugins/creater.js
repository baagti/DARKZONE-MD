const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "creater",
    alias: ["status", "online", "a"],
    desc: "Check bot creater",
    category: "creater",
    react: "💧",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
╭───〔 *🤖 ${config.BOT_creater}* 〕───◉
│✨ * I AM RRAL OWNER!*
│❤️.💞,❤️,💕,❤️,😍,🤩
│👩‍⚕️ *creater:* ${𝐸𝑅𝐹𝒜𝒩 𝒜𝐻𝑀𝒜𝒟}
│⚡ *NUMBER* : ${+923306137477}
╰────────────────────◉
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: https://files.catbox.moe/4wyfey.jpg },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363416743041101@newsletter',
                    newsletterName: '𝐸𝑅𝐹𝒜𝒩 𝒜𝐻𝑀𝒜𝒟',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
