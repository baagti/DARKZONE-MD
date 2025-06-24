const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const { version, isLatest } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    version
  });

  // Newsletter IDs to watch
  const newsletterJids = [
    "120363416743041101@newsletter"
  ];

  // Emoji pool to react with
  const emojis = [
    "❤️", "💀", "🌚", "🌟", "🔥", "❤️‍🩹", "🌸", "🍁", "🍂", "🦋", "🍥",
    "🍧", "🍨", "🍫", "🍭", "🎀", "🎐", "🎗️", "👑", "🚩", "🇵🇰", "🍓",
    "🍇", "🧃", "🗿", "🎋", "💸", "🧸"
  ];

  // Event listener for new messages
  conn.ev.on('messages.upsert', async ({ messages }) => {
    const mek = messages[0];
    if (!mek.message) return;

    // Only react to newsletters
    if (mek.key && newsletterJids.includes(mek.key.remoteJid)) {
      try {
        const serverId = mek.newsletterMessageId || mek.key.id;
        if (serverId) {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          await conn.newsletterReactMessage(mek.key.remoteJid, serverId.toString(), emoji);
          console.log(`✅ Reacted with ${emoji}`);
        }
      } catch (e) {
        console.error("❌ Error reacting to newsletter:", e);
      }
    }
  });

  conn.ev.on('creds.update', saveCreds);
};

startBot();
