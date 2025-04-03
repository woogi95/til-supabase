"use client";

import { deleteBlog, getBlogId } from "@/app/actions/blog-action";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");
  const [date, setDate] = useState<string>("");
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    fetchgetBlogId(id as string);
  }, []);
  const fetchgetBlogId = async (_id: string) => {
    const { data, error, status } = await getBlogId(Number(_id));
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setDate(data.created_at);
    }
  };
  // 내용 삭제 : 이미지도 같이 삭제
  const delelteContent = async () => {
    const { error, status } = await deleteBlog(Number(id));
    if (!error) {
      router.push(`/blog`);
    }
  };
  return (
    <div className="w-[920px] h-screen bg-[#f9f9f9] border-r border-[#d6d6d6] flex items-start justify-center">
      <div className="w-full flex flex-col p-4">
        <h1 className="w-full text-center text-xl mb-4 font-bold">Blog Read</h1>
        <div className="flex justify-between p-3 space-y-4">
          <div className="text-lg font-semibold mb-2">{title}</div>
          <div className="text-gray-600 text-sm mb-4">{date.split("T")[0]}</div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content || "" }}
          className="editor ProseMirror"
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => router.push(`/blog/edit/${id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            수정
          </Button>
          <Button
            onClick={() => delelteContent()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
