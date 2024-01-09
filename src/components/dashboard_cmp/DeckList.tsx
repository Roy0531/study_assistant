'use client'

import { useState } from "react";
import { VscFolder } from "react-icons/vsc";

type DeckProps = {
    deck_id: number;
    title: string;
}

type CheckListProps = {
    setDeck: (deck: number) => void;
    decks: DeckProps[];
}

type RadioItemProps = {
    title: string
    deck_id: number;
    handleCheck: (id: number) => void;
    selectedDeck: number | null;
}

function RadioItem({title, deck_id, handleCheck, selectedDeck}: RadioItemProps) {
    return (
        <div className="flex items-center mb-3 border-b-[1px] pb-1 border-sub-text">
            <input type="radio"
            checked={deck_id === selectedDeck}
            onChange={() => handleCheck(deck_id)} 
            className="w-3 h-3 text-blue-600 rounded" />
            <label className="flex items-center ms-2 text-xs font-bold"><VscFolder className='w-4 h-4 mx-2'/>{title}</label>
        </div>
    )
}

export default function CheckList({ setDeck, decks }: CheckListProps) {
    const [selectedDeck, setSelectedDeck] = useState<number | null>(null);

    const handleCheck = (id: number) => {
        setDeck(id);
        setSelectedDeck(id);
    };

    return (
        <>
            <p className="text-[14px] font-bold mb-4">Registered Deck</p>
            {decks?.length > 0 ? (
                <ul className='h-[240px] overflow-y-auto'>
                    {decks?.map((deck:DeckProps) => (
                        <li key={deck.deck_id}>
                            <RadioItem title={deck.title} deck_id={deck.deck_id} handleCheck={handleCheck} selectedDeck={selectedDeck}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='text-center my-10'>
                    <p className="text-xs font-bold">No deck registered!</p>
                </div>
            )}
        </>
    )
}
