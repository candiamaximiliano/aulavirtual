import React from "react";
import paginationStyles from "./Pagination.module.css";

export default function Pagination({
  anunciosPerPage,
  allAnuncios,
  paginationNumber,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allAnuncios / anunciosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={paginationStyles.nav}>
      {pageNumbers?.map((number) => (
        <button
          key={number}
          onClick={() => paginationNumber(number)}
          className={paginationStyles.button}
        >
          {number}
        </button>
      ))}
    </nav>
  );
}
