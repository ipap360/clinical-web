import name from './name';
import dictionary from "./resources/translations/dictionary.json";

let resources = {};
for (let lang in dictionary) {
    resources[lang] = { [name]: { ...dictionary[lang] } }
}

export default resources;