
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { RemoveToPaste } from '../Redux/PasteSlice'

const Paste = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(RemoveToPaste(pasteId));
    }

    function handleEdit(paste) {
        navigate(`/?PasteId=${paste._id}`);
    }
    async function handleShare(pasteId) {
        // 1. Construct the unique link for this specific paste
        // This creates a link like: https://yourdomain.com
        const shareUrl = `${window.location.origin}/pastes/${pasteId}`;

        const shareData = {
            title: 'Check out this Paste!',
            text: 'I want to share this paste with you.',
            url: shareUrl,
        };

        // 2. Open native device share menu if supported
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Shared successfully');
            } catch (error) {
                console.log('Sharing cancelled or failed:', error);
            }
        } else {
            // 3. Fallback: Copy to clipboard if navigator.share isn't available
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert('Web Share not supported on this browser. Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-slate-800 mb-6">
                    My Pastes
                </h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search your paste..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 mb-8 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Paste List */}
                <div className="grid gap-5">

                    {filteredData.length > 0 ? (

                        filteredData.map((paste) => (

                            <div
                                key={paste._id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
                            >

                                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                    {paste.title}
                                </h2>

                                <p className="text-slate-600 mb-4 whitespace-pre-wrap">
                                    {paste.content.substring(0, 150)}
                                    {paste.content.length > 150 ? "..." : ""}
                                </p>

                                <p className="text-sm text-slate-400 mb-5">
                                    Created: {new Date(paste.createdAt).toLocaleDateString()}
                                </p>

                                <div className="flex flex-wrap gap-3">

                                    <Link
                                        to={`/pastes/${paste._id}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View
                                    </Link>

                                    <button
                                        onClick={() => handleEdit(paste)}
                                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(paste._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleShare(paste._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Share
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-700">
                                No Pastes Found!
                            </h2>
                            <p className="text-slate-400 mt-2">
                                Create a new paste or try another search.
                            </p>
                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}

export default Paste
