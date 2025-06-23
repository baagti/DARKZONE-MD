const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "creator",
    desc: "Show the real creator's name and contact.",
    category: "info",
    react: "👤",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

    const creatorName = "𝐸𝑅𝐹𝒜𝒩 𝒜𝐻𝑀𝒜𝒟 💜";
    const creatorNumber = "923306137477"; // no "+" and no "@s.whatsapp.net"
    const creatorPhoto = "https://files.catbox.moe/4wyfey.jpg";

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${creatorName}
TEL;type=CELL;type=VOICE;waid=${creatorNumber}:${creatorNumber}
END:VCARD`.trim();

    try {
        // Send contact card
        await conn.sendMessage(m.chat, {
            contacts: [{
                displayName: creatorName,
                vcard: vcard
            }]
        }, { quoted: mek });

        // Send profile image with name and number
        await conn.sendMessage(m.chat, {
            image: { url: creatorPhoto },
            caption: `👤 *Creator Name:* ${creatorName}\n📞 *Number:* https://wa.me/${creatorNumber}`
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in creator command:", error);
        reply("❌ Could not send creator info.");
    }
});
