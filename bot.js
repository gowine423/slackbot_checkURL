const { App } = require('@slack/bolt');
require('dotenv').config();

// Initialize the Slack app
const app = new App({
    token: process.env.Token, // Your bot token
    signingSecret: process.env.SigningSecret // App's signing secret
});

// Listen for messages
app.command('/checkURL', async ({ command, ack, respond }) => {
    await ack(); // Acknowledge the command request
    await respond(command.text); // Respond with the text provided in the command
});

// Start your app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();