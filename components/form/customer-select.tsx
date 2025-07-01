'use client'
import SearchableSelect from './searchable-select';

interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

interface CustomerSelectProps {
  name?: string;
  label?: string;
  form?: any;
  placeholder?: string;
  customers?: { docs: Customer[] };
  onSelect?: (customer: Customer) => void;
  onChange?: (query: string) => void;
  required?: boolean;
  rules?: any[];
  classname?: string;
  value?: string;
  loading?: boolean;
}

const CustomerSelect = ({
  name = 'customerId',
  label = 'Customer',
  form,
  placeholder = 'Select Customer',
  customers,
  onSelect,
  onChange,
  required = false,
  rules = [],
  classname = 'w-full',
  value,
  loading = false
}: CustomerSelectProps) => {
  
  const customerOptions = customers?.docs?.map((customer: Customer) => ({
    id: customer.id,
    name: customer.phone ? `${customer.name} -- (${customer.phone})` : customer.name,
    value: customer.id,
  })) || [];

  const handleSelect = (selectedOption: any) => {
    if (onSelect && selectedOption) {
      const originalCustomer = customers?.docs?.find(c => c.id === selectedOption.id);
      onSelect(originalCustomer);
    }
  };

  return (
    <SearchableSelect
      name={name}
      label={label}
      form={form}
      placeholder={placeholder}
      options={customerOptions}
      onChange={onChange}
      onSelect={handleSelect}
      required={required}
      rules={rules}
      classname={classname}
      value={value}
    />
  );
};

export default CustomerSelect; 