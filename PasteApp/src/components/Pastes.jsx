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
  }

  return (
    <div className="flex flex-col items-center">
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 bg-[#6698FA] text-white placeholder-white"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5 border p-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              className="border border-[#3568D4] text-[#3568D4] font-bold w-[600px] h-[250px] p-4 rounded-xl flex flex-col justify-between "
              key={paste._id}
            >
              {/* Title & Buttons */}
              <div className="flex justify-between items-start">
                <div className="font-extrabold text-2xl">{paste.title}</div>
                <div className="flex gap-2">
                  <button>
                    <Link
                      to={`/?pasteId=${paste._id}`}
                      className="p-0 m-0 leading-none appearance-none bg-transparent "
                    >
                      <Edit size={18} />
                    </Link>
                  </button>
                  <button>
                    <Link
                      to={`/pastes/${paste._id}`}
                      className="p-0 m-0 leading-none appearance-none bg-transparent"
                    >
                      <Eye size={18} />
                    </Link>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to Clipboard');
                    }}
                    className="p-0 m-0 leading-none appearance-none bg-transparent"
                  >
                    <Clipboard size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="p-0 m-0 leading-none appearance-none bg-transparent"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      const pasteLink = `${window.location.origin}/paste/${paste._id}`;
                      navigator.clipboard.writeText(pasteLink);
                      toast.success('Link copied to clipboard!');
                    }}
                    className="p-0 m-0 leading-none appearance-none bg-transparent"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-auto mt-2 text-base pr-2">
                {paste.content}
              </div>

              {/* Date (Bottom) */}
              <div className="mt-2 text-sm text-right text-gray-600">
                {paste.createdAt}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-lg">No Pastes Found</div>
        )}
      </div>
    </div>
  );
};

export default Pastes;
