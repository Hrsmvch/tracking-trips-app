"use client";
import React from "react";
import ReactLoading from "react-loading";
import LoaderContainer from "../Containers/LoaderContainer";

export default function Loading() {
  return (
    <LoaderContainer>
      <ReactLoading
        type={"bubbles"}
        color="#386d66"
        height={"40px"}
        width={"40px"}
      />
    </LoaderContainer>
  );
}
