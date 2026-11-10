
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../Redux/PasteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const Home = () => {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("PasteId");

    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find(
                (p) => p._id === pasteId
            );

            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    function createPaste() {

        if (!title.trim() || !value.trim()) {
            alert("Please enter both title and content");
            return;
        }

        const normalizedTitle = title.trim().toLowerCase();

        const duplicatePaste = allPastes.find(
            (paste) =>
                paste.title.trim().toLowerCase() === normalizedTitle &&
                paste._id !== pasteId
        );

        if (duplicatePaste) {
            toast.error("A paste with this title already exists!");
            return;
        }

        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPaste(paste));
        }
        else {
            dispatch(addToPaste(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">

                    <input
                        className="w-full sm:w-[66%] p-3 pl-5 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
                        type="text"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        onClick={createPaste}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition shadow-md"
                    >
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>

                </div>

                <div className="mt-8">

                    <textarea
                        className="w-full min-h-[400px] p-5 rounded-xl border border-slate-300 bg-white outline-none resize-y focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm text-slate-700"
                        value={value}
                        placeholder="Enter content here..."
                        onChange={(e) => setValue(e.target.value)}
                        rows={20}
                    />

                </div>

            </div>

        </div>
    );
};

export default Home;
