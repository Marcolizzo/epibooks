import { createContext, useState } from "react";

export const selectedCardContext = createContext();

export function SelectedCard({ children }) {
    const [selectedCard, setSelectedCard] = useState("");

    return (
        <selectedCardContext.Provider value={{ selectedCard, setSelectedCard }}>
            {children}
        </selectedCardContext.Provider>
    )
}

