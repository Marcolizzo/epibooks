import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import CommentSection from "./CommentSection";
import "@testing-library/jest-dom"

describe("CommentSection", () => {
    test("render Comments area", () => {
        render(<CommentSection />);
        expect(screen.getByTestId("commentsArea")).toBeInTheDocument();
    })
})