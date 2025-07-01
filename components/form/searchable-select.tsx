'use client'
import Loading from '@/app/(landing-page)/loading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/context/i18n';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchableSelect = ({ name, label, form, placeholder, options: parentOptions, onChange, onSelect, required, rules = [], classname, value }: { name?: string; label?: string; form?: any; placeholder?: string; options: any[]; onChange?: (query: string) => void; onSelect?: (option: any) => void, required?: boolean, rules?: any[], classname?: string, value?: string }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState(parentOptions || []);
    const [loading, setLoading] = useState(false);
    const i18n = useI18n();

    useEffect(() => {
        setOptions(parentOptions);
    }, [parentOptions]);

    const filteredOptions = options?.filter((option) =>
        option?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        setLoading(true);

        if (onChange) {
            onChange(query);
        }

        setTimeout(() => {
            setLoading(false);
        }, 100);
    };

    const initRules: any[] = [{ required, message: `${i18n?.t(label)} ${i18n?.t("is required")}` }]

    return (
        <Form.Item name={name} label={label} rules={[...initRules, ...rules]} className={classname}>
            <Select
                onValueChange={(value) => {
                    const selectedOption = options?.find((option) => (option?.id ?? option?.value) === value);
                    !!form && form.setFieldsValue({ [name]: value });
                    if (onSelect) onSelect(selectedOption);
                }}
                value={value}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <div className="p-2">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10 mb-2 text-sm"
                                onKeyDown={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                        </div>
                    </div>
                    {loading ? (
                        // <div className="p-2 text-center">Loading...</div>
                        <Loading/>
                    ) : filteredOptions?.length > 0 ? (
                        filteredOptions?.map((option: any) => (
                            <SelectItem key={option?.id ?? option?.value} value={option?.id ?? option?.value}>
                                {option?.name}
                            </SelectItem>
                        ))
                    ) : (
                        <div className="p-2 text-center text-muted-foreground">No options found</div>
                    )}
                </SelectContent>
            </Select>
        </Form.Item>
    );
};

export default SearchableSelect;