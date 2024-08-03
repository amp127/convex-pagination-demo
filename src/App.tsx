import "./App.css";
import { api } from "../convex/_generated/api";
import { useSimplePaginatedQuery } from "./useSimplePaginatedQuery";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Header } from "./header";
import Footer from "./footer";

function App() {
  const [pageSize, setPageSize] = useState(10);
  const query = useSimplePaginatedQuery(
    api.users.getUsers,
    {},
    { initialNumItems: pageSize }
  );

  const fallbackData = useMemo(
    () => [
      {
        avatar: "https://avatars.githubusercontent.com/u/29665425",
        company: "Dietrich Group",
        name: "Dr. Tomas Satterfield",
        _creationTime: 1722715191074.58,
        _id: "j57cvkhfqz7kxzjden4f3khpcn6y41jn",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { accessorKey: "company", header: "Company" },
      { accessorKey: "name", header: "Name" },
    ],
    []
  );

  const data =
    query.status === "loaded" && query.currentResults
      ? query.currentResults.page
      : fallbackData;

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    query.setPageSize(newSize);
  };

  const isLoading = ["loading", "loadingNext", "loadingPrev"].includes(
    query.status
  );
  const isLastPage =
    query.status === "loaded" &&
    (query.currentResults?.page.length < query.pageSize || !query.nextCursor);

  return (
    <>
      <Header />
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="controls">
            <div className="page-size">
              <label htmlFor="page-size">Page Size: </label>
              <select
                id="page-size"
                value={pageSize}
                onChange={handlePageSizeChange}
                disabled={isLoading}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
            <table className="data-table">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length}>No more data available</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
            <div className="pagination">
              {query.loadPrev &&
                query.status === "loaded" &&
                query.currentCursor !== null && (
                  <button
                    onClick={query.loadPrev}
                    disabled={!query.currentCursor}
                  >
                    Previous Page
                  </button>
                )}
              {query.loadNext && query.status === "loaded" && !isLastPage && (
                <button onClick={query.loadNext} disabled={!query.nextCursor}>
                  Next Page
                </button>
              )}
              <div>Page {query.currentPageNum}</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
