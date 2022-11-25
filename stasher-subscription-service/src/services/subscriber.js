const amqp = require('amqplib/callback_api');
const SubscriptionService = require("./subscriptionService");

module.exports = class Subscriber {
    constructor() {
       
    }
    
    async initSubscriber() {
        var raabitmqSettings = {
            protocol: 'amqp',
            hostname: 'rabbitmq',
            port: 5672,
            username: 'rabbitmquser',
            password: 'rabbitmqpassword'
        }
       
    await amqp.connect(raabitmqSettings, async function(err,connection) {
     
        const channel = await connection.createChannel();
        channel.prefetch(10);
        const queue = 'Category subscription';
        const exchange = 'amq.direct';
        const routingKey = 'sign_up_email';
        process.once('SIGINT', async () => { 
          console.log('got sigint, closing connection');
          await channel.close();
          await connection.close(); 
          process.exit(0);
        });
    
        await channel.assertExchange(exchange, 'direct', {durable: true});
        await channel.assertQueue(queue, {durable: true});
        await channel.bindQueue(queue, exchange, routingKey);
        await channel.consume(queue,async (msg) => {
          console.log('Processing messages...');      
          const subscriptionService = new SubscriptionService();
          const messages = msg.content.toString().split(":")
          const message = messages[0]
          const category = messages[1]
          subscriptionService.sendEmail(category,message)
          await channel.ack(msg);
        }, 
        {
          noAck: false,
          consumerTag: 'sign_up_email'
        });
        console.log(" [*] Waiting for messages. To exit press CTRL+C");

      });

    }

        
}