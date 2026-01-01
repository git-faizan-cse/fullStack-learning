import { UserEvents } from './userEvents.mjs';

const userEvents = new UserEvents();

function saveToDatabase() {
    console.log('Post is saved to database.');
}

function sendNotification() {
    console.log('Notification is sent to user.');
}   

function updateTimeline() {
    console.log('Timeline is updated.');
}   

userEvents.addListener('postCreated', saveToDatabase);
userEvents.addListener('postCreated', sendNotification);
userEvents.addListener('postCreated', updateTimeline);

userEvents.createPost('Hello World!');