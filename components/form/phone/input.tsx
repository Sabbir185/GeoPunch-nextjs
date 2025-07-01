import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import parsePhoneNumberFromString, {
    AsYouType,
    type CarrierCode,
    type CountryCallingCode,
    type CountryCode,
    type E164Number,
    type NationalNumber,
    type NumberType,
} from "libphonenumber-js";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { countries } from "./countries";
import { useStateHistory } from "./use-state-history";

export type Country = (typeof countries)[number];

export type PhoneData = {
    phoneNumber?: E164Number;
    countryCode?: CountryCode;
    countryCallingCode?: CountryCallingCode;
    carrierCode?: CarrierCode;
    nationalNumber?: NationalNumber;
    internationalNumber?: string;
    possibleCountries?: string;
    isValid?: boolean;
    isPossible?: boolean;
    uri?: string;
    type?: NumberType;
};

interface PhoneInputProps extends React.ComponentPropsWithoutRef<"input"> {
    value?: string;
    defaultCountry?: CountryCode;
    onChange?: (value: any) => void;
}

export function getPhoneData(phone: string): PhoneData {
    const asYouType = new AsYouType();
    asYouType.input(phone);
    const number = asYouType.getNumber();
    return {
        phoneNumber: number?.number,
        countryCode: number?.country,
        countryCallingCode: number?.countryCallingCode,
        carrierCode: number?.carrierCode,
        nationalNumber: number?.nationalNumber,
        internationalNumber: number?.formatInternational(),
        possibleCountries: number?.getPossibleCountries().join(", "),
        isValid: number?.isValid(),
        isPossible: number?.isPossible(),
        uri: number?.getURI(),
        type: number?.getType(),
    };
}

export function PhoneInput({
    value: valueProp,
    defaultCountry = "BD",
    className,
    id,
    required = true,
    onChange,
    ...rest
}: PhoneInputProps) {
    const asYouType = new AsYouType();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [value, handlers, history] = useStateHistory(valueProp);

    console.log(value)

    if (value && value.length > 0) {
        defaultCountry =
            parsePhoneNumberFromString(value)?.getPossibleCountries()[0] ||
            defaultCountry;
    }

    const [openCommand, setOpenCommand] = React.useState(false);
    const [countryCode, setCountryCode] =
        React.useState<CountryCode>(defaultCountry);

    const selectedCountry = countries.find(
        (country) => country.iso2 === countryCode,
    );

    const initializeDefaultValue = () => {
        if (value) {
            return value;
        }

        return `+${selectedCountry?.phone_code}`;
    };

    const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
        asYouType.reset();

        let value = event.currentTarget.value.trim();
        if (!value.startsWith("+")) {
            value = `+${value}`;
        }

        const formattedValue = asYouType.input(value).replace(/\s+/g, '');;
        const number = asYouType.getNumber();
        setCountryCode(number?.country || defaultCountry);
        event.currentTarget.value = formattedValue;
        handlers.set(formattedValue);
        if (onChange) {
            onChange(formattedValue)
        }
    };

    const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        asYouType.reset();

        const clipboardData = event.clipboardData;

        if (clipboardData) {
            const pastedData = clipboardData.getData("text/plain").trim();;
            const formattedValue = asYouType.input(pastedData).replace(/\s+/g, '');;
            const number = asYouType.getNumber();
            setCountryCode(number?.country || defaultCountry);
            event.currentTarget.value = formattedValue;
            handlers.set(formattedValue);
            if (onChange) {
                onChange(formattedValue)
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.metaKey || event.ctrlKey) && event.key === "z") {
            handlers.back();
            if (
                inputRef.current &&
                history.current > 0 &&
                history.history[history.current - 1] !== undefined
            ) {
                event.preventDefault();
                inputRef.current.value = history.history[history.current - 1] || "";
            }
        }
    };

    return (
        <div className={cn("flex gap-2", className)} dir="ltr">
            <Popover open={openCommand} onOpenChange={setOpenCommand} modal={true}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCommand}
                        className="w-max items-center justify-between whitespace-nowrap h-10 disabled:border-muted-foreground/60 "
                        disabled
                    >
                        {selectedCountry?.name ? (
                            <span className="relative text-base">{selectedCountry.emoji}</span>
                        ) : (
                            "Select country"
                        )}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-max" align="start">
                    <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <ScrollArea
                                className={
                                    "[&>[data-radix-scroll-area-viewport]]:max-h-[300px]"
                                }
                            >
                                <CommandGroup>
                                    {countries.map((country) => {
                                        return (
                                            <CommandItem
                                                key={country.iso3}
                                                value={`${country.name} (+${country.phone_code})`}
                                                onSelect={() => {
                                                    if (inputRef.current) {
                                                        inputRef.current.value = `+${country.phone_code}`;
                                                        handlers.set(`+${country.phone_code}`);
                                                        inputRef.current.focus();
                                                        if (onChange) {
                                                            onChange(`+${country.phone_code}`)
                                                        }
                                                    }
                                                    setCountryCode(country.iso2 as CountryCode);
                                                    setOpenCommand(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 size-4",
                                                        countryCode === country.iso2
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                {country.emoji}&nbsp;&nbsp;
                                                {country.name}
                                                <span className="text-gray-11 ml-1">
                                                    (+{country.phone_code})
                                                </span>
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Input
                ref={inputRef}
                type="text"
                pattern="^(\+)?[0-9\s]*$"
                name="phone"
                id={id}
                placeholder="Phone"
                defaultValue={initializeDefaultValue()}
                onInput={handleOnInput}
                onPaste={handleOnPaste}
                onKeyDown={handleKeyDown}
                required={required}
                aria-required={required}
                {...rest}
            />
        </div>
    );
}