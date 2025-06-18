await conn.sendMessage(from, {
  text: "Choose a menu option:",
  buttons: [
    { buttonId: "menu_1", buttonText: { displayText: "📥 Download Menu" }, type: 1 },
    { buttonId: "menu_2", buttonText: { displayText: "👥 Group Menu" }, type: 1 },
    { buttonId: "menu_3", buttonText: { displayText: "😄 Fun Menu" }, type: 1 },
    // add more buttons...
  ],
  headerType: 1
}, { quoted: mek });
