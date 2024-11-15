const { App } = require('@slack/bolt');
require('dotenv').config();

// Initialize the Slack app
const app = new App({
    token: process.env.Token, // Your bot token
    signingSecret: process.env.SigningSecret // App's signing secret
});

const checkURL = strURL => {
    const formData = new FormData();
    formData.append('domain',
        strURL,
    );

    fetch('https://domain-dns-and-mail-security-checker.p.rapidapi.com/data', {
        method: 'POST',
        headers: {
            'x-rapidapi-host': 'domain-dns-and-mail-security-checker.p.rapidapi.com',
            'x-rapidapi-key': '04ab65914amsh44814d74a1a56a5p1661c1jsn3d4258c22dc1',
            // 'Content-Type': 'multipart/form-data',
            // Note: 'Content-Type' is not needed for FormData; it will be set automatically
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        return error;
    });
}

// Listen for messages
app.command('/checkurl', async ({ command, ack, respond }) => {
    await ack(); // Acknowledge the command request
    const formData = new FormData();
    formData.append('domain',
        command.text,
    );

    fetch('https://domain-dns-and-mail-security-checker.p.rapidapi.com/data', {
        method: 'POST',
        headers: {
            'x-rapidapi-host': 'domain-dns-and-mail-security-checker.p.rapidapi.com',
            'x-rapidapi-key': '04ab65914amsh44814d74a1a56a5p1661c1jsn3d4258c22dc1',
            // 'Content-Type': 'multipart/form-data',
            // Note: 'Content-Type' is not needed for FormData; it will be set automatically
        },
        body: formData,
    })
    .then(response => response.json())
    .then(async(data) => {
        console.log(data);
        await respond(JSON.stringify(data));
    })
    .catch(async(error) => {
        console.error('Error:', error);
        await respond(JSON.stringify(error));
    });
});


app.command('/checkbulkurl', async ({ command, ack, respond }) => {
    await ack(); // Acknowledge the command request
    result = [];
    urls = command.text.split(' ').filter(url => url.trim() !== '');
    for (let url of urls) {
        const formData = new FormData();
        formData.append('domain',
            url,
        );
    
        await fetch('https://domain-dns-and-mail-security-checker.p.rapidapi.com/data', {
            method: 'POST',
            headers: {
                'x-rapidapi-host': 'domain-dns-and-mail-security-checker.p.rapidapi.com',
                'x-rapidapi-key': '04ab65914amsh44814d74a1a56a5p1661c1jsn3d4258c22dc1',
                // 'Content-Type': 'multipart/form-data',
                // Note: 'Content-Type' is not needed for FormData; it will be set automatically
            },
            body: formData,
        })
        .then(response => response.json())
        .then(async(data) => {
            console.log(data);
            result.push(data)
        })
        .catch(async(error) => {
            console.error('Error:', error);
            result.push(error)
        });
    }
    await respond(JSON.stringify(result));
});

// Start your app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();