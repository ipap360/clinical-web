import { PROFILE } from "../routes";
import { sessions } from "../../api";
import { Link } from "../../components";

export default ({ t }) => [
    {
        children: t("Profile"),
        component: Link,
        to: PROFILE,
        divider: true
    },
    {
        children: t("Logout"),
        onClick: () => {
            sessions.expire();
        }
    }
];
