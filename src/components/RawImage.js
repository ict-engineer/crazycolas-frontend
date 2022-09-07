import React from "react";

export default function RawImage({ src = "", alt = "", ...props }) {
  return <img src={src ?? ""} alt={alt ?? ""} {...props} />;
}
