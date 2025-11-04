import { useMemo } from "react";
import { getRouteApi } from "@tanstack/react-router";
import type { PaginationState } from "@tanstack/react-table";
import { z } from "zod";

import type { AvailableRoutesId } from "@/config/router";

const paginationValidation = z.object({
  page: z.number(),
});

export const paginationValidationWithDefaults = z.object({
  page: z.number().default(1),
});

export const usePagination = (path: AvailableRoutesId) => {
  const { useNavigate, useSearch } = getRouteApi(path);

  const search = useSearch();
  const navigate = useNavigate();

  const { page } = useMemo(() => paginationValidation.parse(search), [search]);

  const pageIndex = page - 1;

  const changePage = ({ pageIndex: newPageIndex }: { pageIndex: PaginationState["pageIndex"] }) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPageIndex + 1 }),
    });
  };

  const resetPage = () => changePage({ pageIndex: 0 });

  return { actions: { changePage, resetPage }, page, pageIndex };
};
