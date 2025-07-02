import { cn } from '@/lib/utils'
import { Form } from 'antd'
import { Loader2, Search, X } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {useI18n} from "@/contexts/i18n";

const FormSearch = ({
    name,
    label,
    form,
    data,
    loading,
    initialValue,
    placeholder,
    className,
    required,
    onChange,
    onFinish
}: {
    name: string
    label?: string
    form?: any
    loading?: boolean
    data?: any
    className?: string
    initialValue?: string
    placeholder?: string
    required?: boolean
    onChange?: any
    onFinish?: any
}) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState(initialValue || "")
    const inputRef = useRef<HTMLInputElement>(null)
    const i18n = useI18n()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (onChange) {
            onChange(value);
        }
        setQuery(value)
        if (value.length > 0 && !open) {
            setOpen(true)
        }
    }

    const clearSearch = () => {
        setQuery("")
        form.setFieldsValue({ [name]: "" })
        inputRef.current?.focus()
    }

    const handleSelect = (item: any) => {
        setQuery(item?.name)
        form.setFieldsValue({ [name]: item?.name })
        // if (onChange) {
        //     onChange(item);
        // }
        if (onFinish) {
            onFinish(item);
        }
        setOpen(false)
    }

    return (
        <div className={cn('relative w-full', className)}>
            <div className="relative">
                <Label>
                    {i18n?.t(label)}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <div className="relative mt-2 flex items-center">
                    <Search className="absolute left-3 top-[20px] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Form.Item name={name} initialValue={initialValue} className='w-full' rules={[{ required, message: `${i18n?.t(label)} ${i18n?.t("is required")}` }]}>
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder={i18n?.t(placeholder)}
                            className="pl-10 pr-10"
                            value={query}
                            onChange={handleInputChange}
                            onFocus={() => query.length > 0 && setOpen(true)}
                            onBlur={() => setTimeout(() => setOpen(false), 200)}
                        />
                    </Form.Item>
                    {query.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-0  top-[20px] -translate-y-1/2  h-full px-3 py-2 hover:bg-transparent"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">{i18n?.t("Clear")}</span>
                        </Button>
                    )}
                </div>
            </div>

            {open && (
                <div className="absolute top-[70px] w-full z-50 mt-1">
                    <Command className="rounded-lg border shadow-md">
                        <CommandList>
                            <CommandEmpty>{
                                loading ? <Loader2 className="h-5 w-5 mx-auto animate-spin" /> : i18n?.t('No results found.')
                            }</CommandEmpty>
                            <CommandGroup heading={i18n?.t("Suggestions")}>
                                {loading ? '' : data?.docs?.map((item: any) => {
                                    return (
                                        <CommandItem
                                            key={item.id}
                                            onSelect={() => handleSelect(item)}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                {item?.images?.length > 0 && <Image src={item?.images[0]} alt={item?.name} width={24} height={24} className="rounded h-[24px] w-[24px] cursor-pointer object-cover" />}
                                                <p>
                                                    {item?.name.length > 70 ? item?.name.substring(0, 70) + "..." : item?.name}
                                                </p>
                                            </div>
                                            
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            )}
        </div>
    )
}

export default FormSearch