const { cmd, commands } = require('../command');
const config = require('../config');

cmd({
    pattern: "creator", // Fixed spelling
    desc: "Show the real creator's name and contact.",
    category: "info",
    react: "👤",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

    // Creator information
    const creatorName = "𝐸𝑅𝐹𝒜𝒩 𝒜𝐻𝑀𝒜𝒟 💜";
    const creatorNumber = "923189999659"; // Add without '@s.whatsapp.net'
    const creatorPhoto = "https://files.catbox.moe/4wyfey.jpg";

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${creatorName}
TEL;type=CELL;type=VOICE;waid=${creatorNumber}:${creatorNumber}
END:VCARD`.trim();

    try {
        await conn.sendMessage(m.chat, {
            contacts: [{
                displayName: creatorName,
                vcard
            }]
        }, { quoted: mek });

        await conn.sendMessage(m.chat, {
            image: { url: creatorPhoto },
            caption: `👤 *Creator Name:* ${creatorName}\n📞 *Number:* wa.me/${creatorNumber}`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Failed to send creator info.");
    }
});
