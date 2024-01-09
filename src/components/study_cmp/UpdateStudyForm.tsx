'use client'

import { updateStudyRecord } from "@/actions/update-reviewdata-action";
import { useState } from "react";

type StudyFormProps = {
    card_id: number;
    deck_id: number;
}

export default function UpdateStudyForm({ card_id, deck_id }: StudyFormProps ) {
    const [status, setStatus] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (status) {
            await updateStudyRecord({ formData, card_id, deck_id });
            setSubmitted(true);
        }
    };
    

    return (
        <div className="flex gap-4">
            <form onSubmit={handleSubmit} >
                <input type="hidden" name="mastery" value={50} />
                <button type="submit" disabled={submitted} onClick={() => setStatus('bad')}
                    className={`text-white rounded-full w-24 px-4 py-0.5 mx-2 ${submitted ? `${status === 'bad' ? 'bg-bad':'bg-nav-edge'}`:'bg-bad hover:bg-bad-hover'}`}>Bad</button>
            </form>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="mastery" value={75} />
                <button type="submit" disabled={submitted} onClick={() => setStatus('good')}
                    className={`text-white rounded-full w-24 px-4 py-0.5 mx-2 ${submitted ? `${status === 'good' ? 'bg-good':'bg-nav-edge'}`:'bg-good hover:bg-good-hover'}`}>Good</button>
            </form>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="mastery" value={100} />
                <button type="submit" disabled={submitted} onClick={() => setStatus('perfect')}
                    className={`text-white rounded-full w-24 px-4 py-0.5 mx-2 ${submitted ? `${status === 'perfect' ? 'bg-perfect':'bg-nav-edge'}`:'bg-perfect hover:bg-perfect-hover'}`}>Perfect</button>
            </form>
        </div>
        
    )
}

