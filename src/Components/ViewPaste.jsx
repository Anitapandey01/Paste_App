
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const ViewPaste = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const paste = useSelector((state) =>
        state.paste.pastes.find((item) => item._id === id)
    );

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(paste.content);
            toast.success("Content copied successfully!");
        } catch (error) {
            toast.error("Unable to copy content");
        }
    }

    function handleEdit() {
        navigate(`/?PasteId=${paste._id}`);
    }

    if (!paste) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Paste Not Found!
                    </h2>

                    <button
                        onClick={() => navigate('/pastes')}
                        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Pastes
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">

                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

                        <h1 className="text-2xl font-bold text-slate-800">
                            {paste.title}
                        </h1>

                        <div className="flex gap-3">

                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Copy
                            </button>

                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                            >
                                Edit
                            </button>

                        </div>

                    </div>

                    <p className="text-sm text-slate-400 mb-5">
                        Created: {new Date(paste.createdAt).toLocaleString()}
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 min-h-62.5">

                        <p className="text-slate-700 whitespace-pre-wrap wrap-break-word">
                            {paste.content}
                        </p>

                    </div>

                    <button
                        onClick={() => navigate('/pastes')}
                        className="mt-6 px-5 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
                    >
                        Back to Pastes
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ViewPaste
