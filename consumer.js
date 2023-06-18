const { PubSub } = require(`@google-cloud/pubsub`);

const pubsubClient = new PubSub();
const subscriptionName = 'projects/python-crud-f4e1e/subscriptions/test_pub_sup_topics-sub';
const timeout = 60;
const topicName = 'projects/python-crud-f4e1e/topics/test_pub_sup_topics';

async function createSubscription() {
  // Creates a new subscription
  await pubsubClient.topic(topicName).createSubscription(subscriptionName);
  console.log(`Subscription ${subscriptionName} created.`);
}

async function doesSubscriptionExist() {
  const subscriptions = await pubsubClient.getSubscriptions();
  const subscriptionExist = subscriptions.find((sub) => sub.name === subscriptionName);
  return (subscriptions && subscriptionExist);
}

if(!doesSubscriptionExist()) {
    createSubscription().catch(console.error);
}

const subscription = pubsubClient.subscription(subscriptionName);

let messageCount = 0;

const messageHandler = message => {
  console.log(`message received ${message.id}`);
  console.log(`Data: ${message.data}`);
  messageCount += 1;

  message.ack();
};

subscription.on(`message`, messageHandler);
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received`);
}, timeout * 1000);