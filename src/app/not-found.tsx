import React from "react";

function NotFound() {
  return (
    <div className="bg-muted h-[calc(100vh-48px)] flex justify-center items-center rounded-2xl">
      <p className="font-medium  tracking-wider">
        <span className="text-xl "> 404 |</span> This page could not be found.
      </p>
    </div>
  );
}

export default NotFound;
