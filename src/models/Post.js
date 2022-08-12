const mongoose = require( 'mongoose' );

const Post = new mongoose.Schema( {
    name: String,
    position: String,
    remuneration: String,
    area: String
},
{
    timestamps: true
} 
)

module.exports = mongoose.model('Post', Post);