import { PATIENTS_LIST, SETTINGS, ROOT } from "../routes";
import { Link } from "../../components";
export default ({ t }) => [
    {
        children: t("Home"),
        component: Link,
        to: ROOT,
        divider: true
    },
    {
        children: t("Patients"),
        component: Link,
        to: PATIENTS_LIST
    },
    {
        children: t("Settings"),
        component: Link,
        to: SETTINGS
    }
];
