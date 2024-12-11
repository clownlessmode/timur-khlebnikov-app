import React from "react";

interface Props {
  children: React.ReactNode;
}

const ScreenContainer = ({ children }: Props) => {
  return (
    <main className="bg-gray-50 flex-1 overflow-y-auto h-full flex-grow p-4 w-full flex flex-col gap-3">
      {children}
    </main>
  );
};

export default ScreenContainer;
