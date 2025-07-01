/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

type ActionFunc = (data: any) => Promise<{ error: boolean; msg: string; data: any }>

interface IUseAction {
    (func: any, data: any, onSuccess: any, onError?: any, successAlert?: boolean, successMsg?: string): Promise<void>
}

interface IUseActionConfirm {
    (func: any, data: any, reload: any, message?: string, confirmText?: string, alert?: boolean): Promise<void>
}


export const useFetch = (
    func: ActionFunc,
    query = {},
    load = true,
) => {
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(load)
    const [error, setError] = useState("")
    const [params, setParams] = useState(query)

    useEffect(() => {
        if (load) {
            getData(params)
        }
    }, [])

    const getData = (query: SetStateAction<object>) => {
        setLoading(true)
        setError("")
        setParams({ ...params, ...query })
        func({ ...params, ...query })
            .then((res) => {
                setLoading(false)
                if (Array.isArray(res)) {
                    setData(res)
                } else if (res && res.error === false) {
                    setData(res.data)
                } else {
                    setData(undefined)
                    setError(res?.msg || 'Failed to fetch data')
                }
            })
            .catch(() => {
                setData(undefined)
            })
    }
    const clear = () => setData(undefined)
    return [data, getData, { query: params, loading, error, clear }]
}

export const useAction: IUseAction = async (func, data, onSuccess, onError, successAlert = true, successMsg) => {
    const { error, msg, data: d } = await func({ ...data })
    if (error === false) {
        if (onSuccess) {
            onSuccess(d)
        }
        if (successAlert) {
            toast.success(successMsg || msg || 'Success', {
                position: "top-right",
                duration: 3000,
                richColors: true
            })
        }
    } else {
        if (onError) {
            onError(d)
        }
        toast.error(msg || 'Error', {
            position: "top-right",
            duration: 3000,
            richColors: true
        })
    }
}

export const useActionConfirm: IUseActionConfirm = async (func, data, reload, message, confirmText, alert = true) => {
    const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: message || 'Are you sure you want to delete this data?',
        confirmButtonText: confirmText || 'Delete',
        icon: 'warning',
        showCancelButton: true,
    })
    if (isConfirmed) {
        await useAction(func, data, reload, undefined, alert)
    }
}

