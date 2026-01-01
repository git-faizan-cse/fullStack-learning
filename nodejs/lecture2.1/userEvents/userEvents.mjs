import * as Events from 'events';


export class UserEvents extends Events.EventEmitter {

    createPost(content) {
        console.log('Post is created.');
        this.emit('postCreated' , content);
    }

}