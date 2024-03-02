import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";
import MyAlert from "./MyAlert";

test('MyAlert component has been mounted correctly', ()=>{
    render(<MyAlert/>)
    const MyAlertElement = screen.queryByTestId('element');
    expect(MyAlertElement).toHaveTextContent('Welcome!')
})