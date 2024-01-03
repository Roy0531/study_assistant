'use client'

import Button from '@/components/Button'
import { addFlashcard } from '@/actions/add-flashcard-action'
import { useRef, useState } from 'react'

type Props = {
    deckId: string;
}

export default function FlashcardForm({ deckId }: Props) {
    const ref = useRef<HTMLFormElement>(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <div className='flex justify-end'>
                <Button color='bg-primary' value={showForm ? 'Close' : 'Create'} className='hover:bg-primary-hover'
                handleFunction={() => setShowForm(!showForm)}/>
            </div>
            {showForm && ( 
                <form ref={ref} action={async formData => { ref.current?.reset(); await addFlashcard({formData, deckId}); }} 
                    className='flex flex-col gap-6 '
                    onSubmit={() => setShowForm(!showForm)}
                >
                    <label htmlFor="front" className='font-bold text-sm'>Front</label>
                    <textarea
                        name="front"
                        placeholder='Enter the front content of the flashcard'
                        className='border border-nav-edge rounded-md p-2 focus:outline-none focus:border-primary'
                        required
                    />
                    <label htmlFor="back" className='font-bold text-sm'>Back</label>
                    <textarea
                        name="back"
                        placeholder='Enter the back content of the flashcard'
                        className='border border-nav-edge rounded-md p-2 focus:outline-none focus:border-primary'
                        required
                    />
                    <Button
                    color='bg-primary'
                    value="Create"
                    className='hover:bg-primary-hover self-center'
                    />
                </form> 
            )}
        </div>
    )
}
