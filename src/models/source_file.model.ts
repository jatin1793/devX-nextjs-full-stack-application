// import mongoose from "mongoose";

// const source_file_schema = new mongoose.Schema({
//     owner: {
//         type: String,
//     },
//     nameOfFile: {
//         type: String,
//     },
//     language_name: {
//         type: String,
//     },
//     language_version: {
//         type: String,
//     },
//     snippet: {
//         type: String,
//     },
// },
//     { timestamps: true }
// )

// export const Source_file = mongoose.models.source_files || mongoose.model("source_files", source_file_schema);

import mongoose from "mongoose";
import { languages, Language } from "../constants/languages";


const defaultSnippets: Record<string, string> = languages.reduce((acc, lang) => {
    acc[lang.name] = lang.snippet;
    return acc;
}, {});


const source_file_schema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    nameOfFile: {
        type: String,
        required: true
    },
    language_name: {
        type: String,
        required: true
    },
    language_version: {
        type: String,
    },
    snippet: {
        type: String,
        default: function() {
            return defaultSnippets[this.language_name] || '';
        }
    },
},
    { timestamps: true }
);

source_file_schema.pre('save', function (next) {
    if (this.isNew) {
        this.snippet = defaultSnippets[this.language_name] || '';
    }
    next();
});

export const Source_file = mongoose.models.source_files || mongoose.model("source_files", source_file_schema);
