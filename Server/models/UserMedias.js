const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userMedias = new mongoose.Schema({

    id: {
        type: 'String',unique : true, required : true, dropDups: true
    },
    instagramId:{
        type:Number
    },
    user: {
        id: {
            type: 'String'
        },
        full_name: {
            type: 'String'
        },
        profile_picture: {
            type: 'String'
        },
        username: {
            type: 'String'
        }
    },
    images: {
        thumbnail: {
            width: {
                type: 'Number'
            },
            height: {
                type: 'Number'
            },
            url: {
                type: 'String'
            }
        },
        low_resolution: {
            width: {
                type: 'Number'
            },
            height: {
                type: 'Number'
            },
            url: {
                type: 'String'
            }
        },
        standard_resolution: {
            width: {
                type: 'Number'
            },
            height: {
                type: 'Number'
            },
            url: {
                type: 'String'
            }
        }
    },
    created_time: {
        type: 'String'
    },
    caption: {
        id: {
            type: 'String'
        },
        text: {
            type: 'String'
        },
        created_time: {
            type: 'String'
        },
        from: {
            id: {
                type: 'String'
            },
            full_name: {
                type: 'String'
            },
            profile_picture: {
                type: 'String'
            },
            username: {
                type: 'String'
            }
        }
    },
    user_has_liked: {
        type: 'Boolean'
    },
    likes: {
        count: {
            type: 'Number'
        }
    },
    tags: {
        type: 'Array'
    },
    filter: {
        type: 'String'
    },
    comments: {
        count: {
            type: 'Number'
        }
    },
    type: {
        type: 'String'
    },
    link: {
        type: 'String'
    },
    location: {
        latitude: {
            type: 'Number'
        },
        longitude: {
            type: 'Number'
        },
        name: {
            type: 'String'
        },
        id: {
            type: 'Number'
        }
    },
    attribution: {
        type: 'Mixed'
    },
    users_in_photo: {
        type: 'Array'
    },
    carousel_media: {
        type: [
            'Mixed'
        ]
    },
    publishedToBlog:{
        type:Boolean,
        required:false
    },
    productLink:{
        type:Array,
        required:false
    },
    isApproved:{type:Boolean,required:false,default:false}
}
);


/**
 * Helper method for getting user's gravatar.
 */


const UserMedias = mongoose.model('UserMedias', userMedias);

module.exports = UserMedias;