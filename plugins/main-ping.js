const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "🌡️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const emojis = ['⚡', '🔥', '🚀', '🌪️', '🎯', '🎉', '✨', '💥', '🌀', '🌈', '🛡️', '📡'];
const reactionEmoji = emojis[Math.floor(Math.random() * emojis.length)];

const styles = [
`┌──「 𝗣𝗜𝗡𝗚 𝗖𝗛𝗘𝗖𝗞 」───
│
│ ⏱️ Response : *${responseTime.toFixed(2)} ms*
│ 📶 Status : *Online* ${reactionEmoji}
│ ⚙️ Mode : *DARKZONE-MD*
│
└────────────────────`,

`╭─〔 🚀 System Status 〕─
│
│ ⚡ Speed : *${responseTime.toFixed(2)} ms*
│ 💡 Bot : *Active* ${reactionEmoji}
│ 🧠 Module : *DARKZONE-MD*
│
╰───────────────╯`,

`───────•••───────
💠 *DARKZONE-MD* 💠

⚡ *Ping:* ${responseTime.toFixed(2)} ms
📶 *Status:* Online ${reactionEmoji}

───────•••───────`,

`╔════⟪ DARKZONE PING ⟫════╗

🔄 Response Time : *${responseTime.toFixed(2)} ms*
📡 Bot Status : *Live* ${reactionEmoji}
💠 MODE : *AUTO CORE*

╚════════════════════╝`,

`╭━━━❰ PING STATUS ❱━━━╮
┃
┃ ⚙️ *MODE* : *DARKZONE-MD*
┃ ⚡ SPEED : *${responseTime.toFixed(2)} ms*
┃ 🔋 Status : *Stable* ${reactionEmoji}
┃
╰━━━━━━━━━━━━━━━━━━━╯`
];

// Pick one style randomly
const text = styles[Math.floor(Math.random() * styles.length)];






        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363416743041101@newsletter',
                    newsletterName: "𝐸𝑅𝐹𝒜𝒩 𝒜𝐻𝑀𝒜𝒟",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2 

cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*PINGING...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*🔥 DARKZONE-MD SPEED : ${ping}ms*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
