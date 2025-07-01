import ReactPaginate from "react-paginate";
import {useI18n} from "@/contexts/i18n";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  show?: boolean;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
  onSizeChange?: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  limit,
  show = true,
  totalPages,
  onPageChange,
  onSizeChange,
}) => {
  const pageCount = totalPages ? Math.ceil(totalPages) : 1;
  const i18n = useI18n();

  return (
    <div className="flex flex-wrap justify-between mb-2">
      {show && (
        <div className="flex items-center !mb-6 md:!mb-0 ">
          {onSizeChange && (
            <div className="flex items-center mr-3 text-sm text-gray-700 h-[24px]">
              {i18n?.t("Show")}
              <select
                value={limit}
                onChange={(e) => {
                  onSizeChange(+e.target.value);
                }}
                className="h-[24px] px-1 rounded mx-2 text-center focus:outline-0"
              >
                <option value={10}>{i18n?.t("10")}</option>
                {limit > 10 && limit < 25 && <option value={limit}>{i18n?.t(limit.toString())}</option>}
                <option value={25}>{i18n?.t("25")}</option>
                <option value={50}>{i18n?.t("50")}</option>
                <option value={100}>{i18n?.t("100")}</option>
              </select>
            </div>
          )}
          {show && (
            <p className="text-sm text-gray-700">
              {i18n?.t("Showing")} {(page - 1) * limit + 1 || 0}
              &nbsp;{i18n?.t("to")} {Math.min(total || 0, page * limit || 0)} {i18n?.t("of")} {total || 0}{" "}
              {i18n?.t("entries")}
            </p>
          )}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        previousLabel={"<"}
        nextLabel={">"}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex gap-2"
        pageClassName="rounded-lg font-semibold overflow-hidden"
        pageLinkClassName="flex items-center justify-center w-8 h-8 bg-primary bg-opacity-10 rounded-lg font-semibold text-primary cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white"
        activeLinkClassName="!bg-primary !text-white"
        previousClassName="rounded-lg font-semibold overflow-hidden"
        previousLinkClassName="flex items-center justify-center w-8 h-8 bg-primary bg-opacity-10 rounded-lg font-semibold text-primary cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white"
        nextClassName="rounded-lg font-semibold overflow-hidden"
        nextLinkClassName="flex items-center justify-center w-8 h-8 bg-primary bg-opacity-10 rounded-lg font-semibold text-primary cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
