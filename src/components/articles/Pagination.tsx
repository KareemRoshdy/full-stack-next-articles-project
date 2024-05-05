import Link from "next/link";

interface Props {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: Props) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {pageNumber !== 1 && (
        <li>
          <Link
            href={`${route}?pageNumber=${prev}`}
            className={`inline-flex size-10 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
          >
            <span className="sr-only">Prev Page</span>
            Prev
          </Link>
        </li>
      )}
      {pagesArray.map((p: number) => (
        <li key={p}>
          <Link
            href={`${route}?pageNumber=${p}`}
            className={`flex items-center justify-center size-10 rounded  text-center leading-8 text-gray-900  dark:text-white ${
              pageNumber === p
                ? "border border-blue-600 bg-blue-600"
                : "border border-gray-800 bg-gray-900"
            }`}
          >
            {p}
          </Link>
        </li>
      ))}

      {pageNumber !== pages && (
        <li>
          <Link
            href={`${route}?pageNumber=${next}`}
            className={`inline-flex size-10 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
          >
            <span className="sr-only">Next Page</span>
            Next
          </Link>
        </li>
      )}
    </ol>
  );
};

export default Pagination;
