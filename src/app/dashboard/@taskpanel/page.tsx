import SingleTask from '@/components/dashboard_cmp/SingleTask';

export default async function TaskPanel() {
    return (
        <div className="px-4 py-2">
            <p className="font-bold mb-2">Tasks</p>
            <div className="h-[220px] overflow-auto">
                <SingleTask task="task"/>
                <SingleTask task="task"/>
                <SingleTask task="task"/>
            </div>
        </div>
    )
}