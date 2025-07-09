import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Edit, Eye, Clipboard, Trash2, Share2 } from 'lucide-react';

const Pastes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success('Paste deleted!');
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center py-10 px-4">
      {/* Search Input */}
      <input
        className="p-3 rounded-full w-full max-w-xl bg-[#2a2a2a] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#4ADE80] transition"
        type="text"
        placeholder="Search pastes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Pastes List */}
      <div className="flex flex-col gap-6 mt-8 w-full max-w-3xl">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-[#1e1e1e] border border-[#4ADE80] rounded-xl shadow-md p-6 flex flex-col space-y-4"
            >
              {/* Title & Actions */}
              <div className="flex justify-between items-start">
                <div className="font-bold text-xl">{paste.title}</div>
                <div className="flex gap-3">
                  <Link to={`/?pasteId=${paste._id}`} className="hover:text-[#4ADE80] transition">
                    <Edit size={20} />
                  </Link>
                  <Link to={`/pastes/${paste._id}`} className="hover:text-[#4ADE80] transition">
                    <Eye size={20} />
                  </Link>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to Clipboard');
                    }}
                    className="hover:text-[#4ADE80] transition"
                  >
                    <Clipboard size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="hover:text-[#4ADE80] transition"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => {
                      const pasteLink = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.clipboard.writeText(pasteLink);
                      toast.success('Link copied to clipboard!');
                    }}
                    className="hover:text-[#4ADE80] transition"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-40 overflow-auto text-gray-300 text-base pr-2 whitespace-pre-wrap">
                {paste.content}
              </div>

              {/* Date */}
              <div className="text-right text-sm text-gray-500">
                {paste.createdAt}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-lg text-center">No Pastes Found</div>
        )}
      </div>
    </div>
  );
};

export default Pastes;
