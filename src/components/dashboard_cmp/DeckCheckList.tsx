import React from 'react'
import { VscFolder } from "react-icons/vsc";
import prisma from '../../../lib/prisma'

type DeckProps = {
  title: string;
  deck_id: number;
}

type CheckItemProps = {
  name: string
}

function CheckItem({name}: CheckItemProps) {
  return (
    <div className="flex items-center mb-3 border-b-[1px] pb-1 border-sub-text">
        <input type="checkbox" value="" className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="flex items-center ms-2 text-xs font-bold"><VscFolder className='w-4 h-4 mx-2'/>{name}</label>
    </div>
  )
}

export default async function DeckCheckList() {
  const decks = await prisma.deck.findMany();

  return (
    <>
      <p className="text-[10px] font-bold self-start mb-2">Registered Decks</p>
      <ul className='h-[240px] max-w-44 overflow-y-auto'>
        {decks?.map((deck:DeckProps) => (
          <li key={deck.deck_id}>
            <CheckItem name={deck.title}/>
          </li>
        ))}
      </ul>
    </>
  )
}