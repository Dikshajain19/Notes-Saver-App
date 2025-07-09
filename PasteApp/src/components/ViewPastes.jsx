import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Edit, Eye, Clipboard, Trash2, Share2 } from 'lucide-react';

const ViewPastes = () => {
  const { id } = useParams();
  const allpastes = useSelector((state) => state.paste.pastes);
  const paste = allpastes.find((p) => p._id === id);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [paste?.content]);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          placeholder="Enter Title here"
          value={paste?.title}
          className="rounded-xl w-[693px]  pl-6 bg-inherit text-white p-4 text-5xl outline-none"
          disabled
        />
      </div>

      <div className="mt-2 relative">
         <button
          onClick={() => {
          navigator.clipboard.writeText(paste?.content);
           toast.success('Copied to Clipboard');
          }}
           className="absolute top-2 right-2 p-0 m-0 leading-none appearance-none bg-transparent text-[#3568D4]"
         >
          <Clipboard size={18} />
         </button>
        <textarea
          ref={textareaRef}
          value={paste?.content}
          placeholder="Enter content here"
          className="rounded-xl w-full p-6 bg-white-100 text-white text-lg outline-none resize-none"
          disabled
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPastes;
