// import "babel-polyfill";
import React from "react";
import { render } from "react-dom";

// import 'typeface-roboto';
import "./index.css";
import "moment/locale/el";

import registerServiceWorker from "./registerServiceWorker";

import Root from "./modules";
import { DateUtils, Theme, Store, I18n } from "./context";

const App = DateUtils(Theme(I18n(Store(Root))));

render(<App />, document.getElementById("root"));

registerServiceWorker();
