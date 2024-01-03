'use client'

import Button from '@/components/Button'
import { addDeck } from '@/actions/add-deck-action'
import { useRef, useState } from 'react'

export default function Form() {
    const ref = useRef<HTMLFormElement>(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <div className='flex justify-end'>
                <Button color='bg-primary' value={showForm ? 'Close' : 'Create'} className='hover:bg-primary-hover'
                handleFunction={() => setShowForm(!showForm)}/>
            </div>
            {showForm && ( 
                <form ref={ref} action={async formData => { ref.current?.reset(); await addDeck(formData); }} 
                    className='flex flex-col gap-6 '
                    onSubmit={() => setShowForm(!showForm)}
                >
                    <label htmlFor="title" className='font-bold text-sm'>Deck Name</label>
                    <input
                        type="text"
                        name="title"
                        placeholder='Name the new deck'
                        className='border border-nav-edge rounded-md p-2 focus:outline-none focus:border-primary'
                        required
                    />
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="event" className='font-bold text-sm'>Event Title</label>
                            <input
                                type="text"
                                name="event"
                                placeholder='Event name'
                                className='border border-nav-edge rounded-md p-2 focus:outline-none focus:border-primary'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="type" className='font-bold text-sm'>Event Type</label>
                            <select name="type" className="border border-nav-edge rounded-md p-2 focus:outline-none focus:border-primary">
                                <option value="exam" className="py-2">Exam</option>
                                <option value="hw" className="py-2">HW</option>
                                <option value="ss" className="py-2">Self-Study</option>
                            </select>
                        </div> 
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="date" className="font-bold text-sm">Target Date</label>
                            <input
                                type="date"
                                name="date"
                                className="border border-nav-edge w-40 rounded-md p-2 focus:outline-none focus:border-primary"
                                required
                            />
                        </div>
                    </div>
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
