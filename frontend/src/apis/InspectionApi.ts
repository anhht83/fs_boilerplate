import Api from "./Api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TTableDataRes } from "@/types/dataTable";
import { useState } from "react";
import { TBasic, TInspection, TInspectionChangeStatusReq, TInspectionTableData } from "@/types/inspection";

export const apiUploadInspections = () => {
  const [progress, setProgress] = useState(0);
  const mutation = useMutation({
    mutationKey: ["uploadInspections"],
    mutationFn: (formData: any) => Api.fetchData({
        url: "/inspections/import",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData,
        onUploadProgress: (event: any) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        }
      }
    )
  });
  return { ...mutation, progress };
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const apiFetchInspections =
  ({
     pageIndex = 1,
     pageSize = 10,
     sort = null,
     query = null
   }: TInspectionTableData, options = {}) => useQuery<TTableDataRes<TInspection>>({
    queryKey: ["inspections", { pageIndex, pageSize, sort, query }],
    queryFn: async () => {
      const response: any = await Api.fetchData({
        url: `/inspections`,
        params: { pageIndex, pageSize, sort, query }
      });
      return response.data;
    },
    ...options
  });

// eslint-disable-next-line react-hooks/rules-of-hooks
export const apiGetInspection =
  (reportNumber: any, options = {}) => useQuery({
    queryKey: ["inspection", reportNumber],
    queryFn: async (): Promise<TInspection> => {
      const response: any = await Api.fetchData({
        url: `/inspections/${reportNumber}`
      });
      return response.data;
    },
    ...options
  });

// eslint-disable-next-line react-hooks/rules-of-hooks
export const apiChangeStatusInspection =
  (options = {}) => useMutation({
    mutationKey: ["changeStatusInspection"],
    mutationFn: async ({ id, status }: TInspectionChangeStatusReq): Promise<TInspection> => {
      const response: any = await Api.fetchData({
        url: `/inspections/${id}/${status}`
      });
      return response.data;
    },
    ...options
  });

// eslint-disable-next-line react-hooks/rules-of-hooks
export const apiFetchBasics =
  (options = {}) => useQuery({
    queryKey: ["basics"],
    queryFn: async (): Promise<TBasic[]> => {
      const response: any = await Api.fetchData({
        url: `/basics`
      });
      return response.data;
    },
    ...options
  });
