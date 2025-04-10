import {Schema, model} from "mongoose";
//Post handler
const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: [true, "User id is required"],
    },
    title: {
        type:String,
        trim:true,
        required: [true, "Title is required"],
    },
    description: {
        type:String,
        trim:true,
        required: [true, "Description is required"],
    },
    media: {
        type:[String],
        required:[true, "Media files are required"],
    },
    mediaPublicIds:{
        type:[String],
    },
    tags:{
        types:[String],
        default:[],
    },
    likes: {
        types: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    savedBy:{
        types: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    isPublic: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps:true,
}
);

const Post = model("Post", postSchema);

export default Post;
