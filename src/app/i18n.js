import { APP_NAME } from '.';
import dictionary from "./resources/translations/dictionary.json";

let resources = {};
for (let lang in dictionary) {
    resources[lang] = { [APP_NAME]: { ...dictionary[lang] } }
}

export default resources;
console.log(resources);