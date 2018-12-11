const ITEM_HEIGHT = 48;

export default {
    container: (base, state) => {
        return {
            ...base,
            width: "100%",
            minWidth: 192,
            // zIndex: 2
        };
    },
    dropdownIndicator: (base, state) => {
        return {
            ...base,
            padding: 4
        };
    },
    valueContainer: (base, state) => {
        return {
            ...base,
            padding: "2px 0"
        };
    },
    control: () => ({
        display: "flex",
        alignItems: "center",
        border: 0,
        height: "auto",
        background: "transparent",
        "&:hover": {
            boxShadow: "none"
        }
    }),
    menu: () => ({
        backgroundColor: "white",
        boxShadow: "1px 2px 6px #888888", // should be changed as material-ui
        position: "absolute",
        left: 0,
        top: `calc(100% + 1px)`,
        width: "100%",
        zIndex: 2,
        maxHeight: ITEM_HEIGHT * 4.5
    }),
    menuList: () => ({
        maxHeight: ITEM_HEIGHT * 4.5,
        overflowY: "auto"
    }),
    clearIndicator: (base, state) => ({
        ...base,
        cursor: "pointer",
        padding: 4
        // color: state.isFocused ? 'blue' : 'black',
    })
};
