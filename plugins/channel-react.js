const config = require('../config');
const { cmd } = require('../command');

const stylizedChars = {
  a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
  h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
  o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
  v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
  '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
  '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
};

const newsletterJids = [
  "120363416743041101@newsletter"
];

const emojis = [
  "❤️", "💀", "🌚", "🌟", "🔥", "❤️‍🩹", "🌸", "🍁", "🍂", "🦋",
  "🍥", "🍧", "🍨", "🍫", "🍭", "🎀", "🎐", "🎗️", "👑", "🚩",
  "🇵🇰", "🍓", "🍇", "🧃", "🗿", "🎋", "💸", "🧸"
];

cmd({
  pattern: "chr",
  alias: ["creact"],
  react: "🔤",
  desc: "React to channel messages with stylized text",
  category: "owner",
  use: '.chr <channel-link> <text>',
  filename: __filename
},
async (conn, mek, m, {
  from, quoted, body, isCmd, command, args, q,
  isGroup, sender, senderNumber, botNumber2, botNumber,
  pushname, isMe, isCreator, groupMetadata, groupName,
  participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    // ✅ Auto-react to messages in the newsletter
    if (
      mek &&
      mek.key &&
      mek.key.remoteJid &&
      newsletterJids.includes(mek.key.remoteJid)
    ) {
      const serverId = mek.newsletterMessage?.message?.id || mek.newsletterServerId;
      if (serverId) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        await conn.newsletterReactMessage(mek.key.remoteJid, serverId.toString(), emoji);
      }
    }

    // ✅ Command: .chr <link> <text>
    if (!isCreator) return reply("❌ Owner only command");
    if (!q) return reply(`Usage:\n${command} https://whatsapp.com/channel/1234567890/987654321 hello`);

    const [link, ...textParts] = q.split(' ');
    if (!link.includes("whatsapp.com/channel/")) return reply("❌ Invalid channel link format");

    const inputText = textParts.join(' ').toLowerCase();
    if (!inputText) return reply("❌ Please provide text to convert");

    const emojiText = inputText.split('').map(char => {
      if (char === ' ') return '―';
      return stylizedChars[char] || char;
    }).join('');

    const channelId = link.split('/')[4];
    const messageId = link.split('/')[5];
    if (!channelId || !messageId) return reply("❌ Invalid link - missing IDs");

    const channelMeta = await conn.newsletterMetadata("invite", channelId);
    await conn.newsletterReactMessage(channelMeta.id, messageId, emojiText);

    return reply(`╭━━━〔 *DARKZONE-MD* 〕━━━┈⊷
┃▸ *Success!* Reaction sent
┃▸ *Channel:* ${channelMeta.name}
┃▸ *Reaction:* ${emojiText}
╰────────────────┈⊷
> *𝐸𝑅𝐹𝒜𝒩 𝒜𝐻𝑀𝒜𝐷*`);
  } catch (e) {
    console.error("❌ Error:", e);
    reply(`❎ Error: ${e.message || "Failed to send reaction"}`);
  }
});
    
