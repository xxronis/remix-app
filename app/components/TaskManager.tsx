export default function TaskManager({percentage}) {
    return (
        <div className="absolute bottom-12 right-12 bg-slate-800 w-1/5 border border-blue-300 shadow rounded-md p-4 max-w-sm mx-auto">
            <div className="animate-pulse flex">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <progress id="file" max="100" value={percentage}> 70% </progress>
                </div>
            </div>
        </div>
    )
}