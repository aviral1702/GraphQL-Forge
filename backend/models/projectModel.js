const { model, Schema, Types } = require("mongoose");

const codeSchema = new Schema({
    user: {type : Types.ObjectId, ref: 'user'},
    name : String,
    config: {type : Object, default: {
        mongoDB_URL: '',
        port : 5500,
        schemaList: [],
        modelName: '',
        queryList: [],
        mutationList: []
    } },
    createdAt: Date
});

module.exports = model("project", codeSchema);