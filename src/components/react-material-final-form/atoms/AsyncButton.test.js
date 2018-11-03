import React from "react";
import { shallow } from 'enzyme';
import AsyncButton from "./AsyncButton";
import { CircularProgress } from "@material-ui/core";

describe("AsyncButton", () => {
    it("should render CircularProgress when loading = true ", () => {
        const result = shallow(<AsyncButton loading={true}>Test</AsyncButton>);
        expect(result.contains(<CircularProgress size={14} />)).toEqual(true);
    });
});
