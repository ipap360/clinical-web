// import "babel-polyfill";
import React from "react";
import { render } from "react-dom";

// import 'typeface-roboto';
import "./index.css";
import "moment/locale/el";

import registerServiceWorker from "./registerServiceWorker";

import Root from "./modules";
import { provide } from "./context";

const App = provide(Root);

render(<App />, document.getElementById("root"));

registerServiceWorker();
