"use client";
import { createTodos, getTodos } from "@/app/actions/test-action";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/ReactQueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const [testInput, setTestInput] = useState<string>("");

  // 데이터 가져오기
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["uniq"],
    queryFn: getTodos,
    retry: 3,
    retryDelay: 3000,
  });

  // 데이터 추가하기
  const createMutaion = useMutation({
    mutationFn: async () => {
      if (testInput.trim() === "") {
        alert("할일을 등록해주세요");
        return;
      }
      await createTodos(testInput);
    },
    onSuccess: () => {
      setTestInput("");
      refetch();
    },
    onError: (error) => {
      console.log("Error : 데이터 추가 실패함.");
      console.log(error.message);
    },
    onSettled: () => {
      console.log("무조건 처리해야 하는 함수");
    },
  });

  // mutateAsync 비동기 실행 예제
  const mutaion = useMutation({
    mutationFn: createTodos,
  });
  const handleAdd = async () => {
    try {
      const now = await mutaion.mutateAsync("추가요");
      console.log("데이터", now);
      queryClient.refetchQueries({ queryKey: ["uniq"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Test Todo</h1>
      <div>
        <Button onClick={() => handleAdd()}>테스트</Button>
      </div>
      <div className="border">
        <input
          type="text"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
        />
        <Button
          disabled={createMutaion.isPending}
          onClick={() => createMutaion.mutate()}
        >
          {createMutaion.isPending ? "추가중 .." : "할일 추가"}
        </Button>
      </div>
      <div>
        <button onClick={() => refetch()}>다시호출</button>
      </div>
      {isLoading && <div>데이터 로딩중 ...</div>}
      {error && <div>Error : {error.message} </div>}
      {data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
