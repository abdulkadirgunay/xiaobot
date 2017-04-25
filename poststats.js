const request = require('superagent');

module.exports.discordBots = (count, userID) => {
    return request
        .post(`https://bots.discord.pw/api/bots/${userID}/stats`)
        .set({
            'Authorization': process.env.DISCORD_BOTS_KEY
        })
        .send({
            server_count: count
        });
};

module.exports.carbon = (count) => {
    return request
        .post('https://www.carbonitex.net/discord/data/botdata.php')
        .send({
            key: process.env.CARBON_KEY,
            servercount: count
        });
};