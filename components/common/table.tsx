/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Empty } from 'antd';
import Pagination from "./pagination";
import { SearchInput } from "../ui/searchInput";
import { ReactNode, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {useAction} from "@/hooks/userAction";
import {useI18n} from "@/contexts/i18n";
import {Loader} from "@/components/common/loader";

interface TableColumn {
    text: string;
    dataField: string;
    className?: string;
    formatter?: (value: any, row: any) => ReactNode;
}

interface TableProps {
    columns: TableColumn[];
    data: any; // Accepts both paginated and non-paginated data
    indexed?: boolean;
    loading?: boolean;
    noActions?: boolean;
    actions?: (data: any) => ReactNode;
    action?: ReactNode;
    onView?: (data: any) => void;
    onEdit?: (data: any) => void;
    onDelete?: (data: any) => Promise<{ error: boolean; msg: string; data: any }>;
    onReload?: (params: any) => void;
    pagination?: boolean;
    shadow?: boolean;
    title?: string | ReactNode;
    noHeader?: boolean;
    afterSearch?: ReactNode;
    permission?: string;
}


const Table: React.FC<TableProps> = ({
    columns,
    data,
    indexed,
    loading = false,
    noActions,
    actions,
    action,
    onView,
    onEdit,
    onDelete,
    onReload,
    pagination = false,
    shadow = false,
    title,
    noHeader = false,
    afterSearch,
}) => {
    const handleDelete = async (data: any) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: i18n?.t('Are you sure you want to delete this data?'),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: i18n?.t('Yes, Delete'),
            cancelButtonText: i18n?.t('No'),
        });

        if (isConfirmed) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await useAction(onDelete, { id: data?.id }, onReload);
        }
    };

    const cols = noActions ? columns : [...columns, {
        text: 'Action',
        dataField: 'no_actions',
        className: 'text-right',
        formatter: (_: any, data: any) => {
            return (
                <div className="flex justify-end gap-2.5">
                    {actions && actions(data)}
                    {onView && (
                        <button
                            className="btn btn-outline-success btn-sm focus:shadow-none border border-green-700 text-green-700 p-2 rounded hover:bg-green-700 hover:text-white "
                            title="View" onClick={() => onView(data)}>
                            <FaEye />
                        </button>
                    )}
                    {data.disableEdit === 1 && !onView && data.disableDelete === 1 && !actions && '-'}
                    {onEdit && (data?.disableEdit !== 1) && (
                        <button
                            className="border border-indigo-700 text-indigo-700 p-2 rounded hover:bg-indigo-700 hover:text-white focus:shadow-none"
                            title="Edit" onClick={() => onEdit(data)}>
                            <FaEdit size={12} />
                        </button>
                    )}
                    {onDelete && (data?.disableDelete !== 1) && (
                        <button
                            className="border border-red-700 p-2 rounded hover:bg-red-700 text-red-600 hover:text-white focus:shadow-none"
                            title="Delete"
                            onClick={async () => await handleDelete(data)}
                        >
                            <FaTrashAlt size={12} />
                        </button>
                    )}
                </div>
            )
        }
    }]
    const i18n = useI18n()

    return (
        <>
            <div className={`w-full bg-white ${shadow ? 'shadow-lg' : 'shadow-sm'} border rounded-xl  mb-4`}>
                {noHeader || (
                    <header className="p-5 border-b border-gray-100 flex justify-between flex-wrap gap-2">
                        {title ? (
                            <>
                                {typeof title === 'string' ?
                                    <h4 className="text-base font-medium text-gray-700">{i18n?.t(title)}</h4> : ""}
                            </>
                        ) : (
                            <div className="flex flex-wrap">
                                <SearchInput
                                    placeholder={"Search..."}
                                    onChange={e => {
                                        onReload?.({ search: e.target.value || undefined, page: 1 })
                                    }}
                                    className=""
                                />
                                {afterSearch}
                            </div>
                        )}
                        {action}
                    </header>
                )}
                <div className="p-5 relative">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase bg-gray-50 text-gray-500">
                                <tr>
                                    {indexed && (
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">#</div>
                                        </th>
                                    )}
                                    {cols?.map((column, index) => (
                                        <th className="p-2 whitespace-nowrap text-left" key={index}>
                                            <div
                                                className={`font-semibold ${column?.className || ''}`}>
                                                {i18n.t(column.text)}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td className="h-[150px] pb-[80px]">
                                            <div style={{ height: 200 }} className='absolute w-[95%] flex justify-center'>
                                                <Loader />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {(pagination ? data?.docs : data)?.map((row: any, index: number) => (
                                            <tr key={index}>
                                                {indexed && (
                                                    <td className="p-2 whitespace-nowrap text-gray-500">
                                                        {(pagination ? (data?.page - 1) * data.limit : 0) + index + 1}
                                                    </td>
                                                )}
                                                {cols?.map((column, index) => (
                                                    <td className={`p-2 whitespace-nowrap text-gray-700 ${column?.className || ''}`}
                                                        key={index}>
                                                        {column.formatter ? column.formatter(row[column.dataField], row) : (row[column.dataField] || '-')}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                        {
                            (data?.docs?.length < 1 || data?.length < 1) && <div className="py-10">
                                <Empty description={i18n.t("No data found!")} />
                            </div>
                        }
                    </div>

                    {pagination && (
                        <div className="pt-3 mt-3 border-t">
                            <Pagination
                                page={data?.page}
                                total={data?.totalDocs}
                                onSizeChange={(limit) => onReload?.({ size: limit })}
                                limit={data?.limit}
                                totalPages={data?.totalPages}
                                onPageChange={(page) => onReload?.({ page })}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Table


interface Column {
    text: string;
    dataField: string;
    formatter?: (value: any, row: any) => ReactNode;
}

interface DetailTableProps {
    data: Record<string, any>;
    columns: Column[];
    title?: string;
    actions?: ReactNode;
}

export const DetailTable: React.FC<DetailTableProps> = ({ data, columns, title, actions }) => {
    const i18n = useI18n()
    return (
        <div className="bg-white">
            {!!title && <div className="text-xl font-semibold mb-4">{i18n.t(title)}</div>}
            <div className="body">
                <div className="overflow-x-auto bg-slate-100 rounded-md border border-primary ">
                    <table className="min-w-full ">
                        <tbody>
                            {columns?.map((column: any, index: number) => (
                                <tr key={index} className={`border-primary ${columns?.length !== index + 1 ? 'border-b' : ''}`}>
                                    <td className="py-2 px-4 border-e border-primary">{i18n.t(column.text)}</td>
                                    <td className="py-2 px-4 text-sm">{!!data ? !!column?.formatter ? column?.formatter(data[column.dataField], data) : data[column.dataField] : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {actions}
            </div>
        </div>
    )
}

export const TableImage = ({ url }: { url: string }) => {
    const [show, setShow] = useState(false)

    return (
        <div>
            <Image
                src={(!url || url === null) ? '/images/no-image.png' : url}
                alt="Image"
                width={100}
                height={100}
                className="rounded h-[50px] w-[50px] cursor-pointer object-cover"
                onClick={() => setShow(true)}
            />
            <Dialog open={show} onOpenChange={setShow}>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className='text-lg font-medium text-mainText'>
                            Full Image
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center items-center">
                        <Image
                            src={(!url || url === null) ? '/images/no-image.png' : url}
                            alt="Full Image"
                            width={800}
                            height={600}
                            style={{ objectFit: 'contain' }}
                            quality={100}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

