const amqp = require('amqplib');

async function sendMessage(queueName, message) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
        durable: true
    });

    channel.sendToQueue(queueName, Buffer.from(message), {
        persistent: true
    });

    await channel.close();
    await connection.close();

}

async function getMessage(queueName) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
        durable: true
    });

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            channel.close();
            connection.close();
            reject(new Error('Operação timeout!'));
        }, 5000);
    
        channel.consume(queueName, async (msg) => {
            clearTimeout(timeout);
    
            if (msg !== null) {
                const content = msg.content.toString();
                channel.ack(msg);
    
                await channel.close();
                await connection.close();
    
                resolve(content);
            } else {
                await channel.close();
                await connection.close();
    
                reject(new Error('Mensagem vazia!'));
            }
        });
    });
}

module.exports = {
    sendMessage,
    getMessage
}