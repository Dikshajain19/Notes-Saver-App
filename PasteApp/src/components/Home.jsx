import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allpastes]); // added allpastes in deps

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Reset fields after save/update
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center  py-12 px-4 text-white">
    

      {/* Paste Form */}
      <div className="w-full max-w-3xl bg-[#1e1e1e] rounded-2xl shadow-lg p-6 space-y-6">
        {/* Title Input + Button */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter Title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-full px-6 py-3 bg-[#2a2a2a] text-white text-lg outline-none focus:ring-2 focus:ring-[#4ADE80] transition"
          />

          <button
            className="rounded-full px-6 py-3 bg-[#4ADE80] hover:bg-[#22C55E] text-white font-semibold text-lg transition transform hover:scale-105"
            onClick={createPaste}
          >
            {pasteId ? 'Update My Paste' : 'Create My Paste'}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={12}
          className="w-full rounded-xl p-6 bg-[#2a2a2a] text-white text-lg outline-none resize-none focus:ring-2 focus:ring-[#4ADE80] transition"
        ></textarea>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-400 text-sm text-center">
        Built  by Diksha
      </footer>
    </div>
  );
};

export default Home;
