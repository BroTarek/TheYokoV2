'use client';

import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Arab countries data with names and codes
const COUNTRIES = [
  // Africa
  { code: "DZ", name: "Algeria", dial_code: "+213" },
  { code: "AO", name: "Angola", dial_code: "+244" },
  { code: "BJ", name: "Benin", dial_code: "+229" },
  { code: "BW", name: "Botswana", dial_code: "+267" },
  { code: "BF", name: "Burkina Faso", dial_code: "+226" },
  { code: "BI", name: "Burundi", dial_code: "+257" },
  { code: "CV", name: "Cabo Verde", dial_code: "+238" },
  { code: "CM", name: "Cameroon", dial_code: "+237" },
  { code: "CF", name: "Central African Republic", dial_code: "+236" },
  { code: "TD", name: "Chad", dial_code: "+235" },
  { code: "KM", name: "Comoros", dial_code: "+269" },
  { code: "CG", name: "Congo - Brazzaville", dial_code: "+242" },
  { code: "CD", name: "Congo - Kinshasa", dial_code: "+243" },
  { code: "CI", name: "Côte d'Ivoire", dial_code: "+225" },
  { code: "DJ", name: "Djibouti", dial_code: "+253" },
  { code: "EG", name: "Egypt", dial_code: "+20" },
  { code: "GQ", name: "Equatorial Guinea", dial_code: "+240" },
  { code: "ER", name: "Eritrea", dial_code: "+291" },
  { code: "SZ", name: "Eswatini", dial_code: "+268" },
  { code: "ET", name: "Ethiopia", dial_code: "+251" },
  { code: "GA", name: "Gabon", dial_code: "+241" },
  { code: "GM", name: "Gambia", dial_code: "+220" },
  { code: "GH", name: "Ghana", dial_code: "+233" },
  { code: "GN", name: "Guinea", dial_code: "+224" },
  { code: "GW", name: "Guinea-Bissau", dial_code: "+245" },
  { code: "KE", name: "Kenya", dial_code: "+254" },
  { code: "LS", name: "Lesotho", dial_code: "+266" },
  { code: "LR", name: "Liberia", dial_code: "+231" },
  { code: "LY", name: "Libya", dial_code: "+218" },
  { code: "MG", name: "Madagascar", dial_code: "+261" },
  { code: "MW", name: "Malawi", dial_code: "+265" },
  { code: "ML", name: "Mali", dial_code: "+223" },
  { code: "MR", name: "Mauritania", dial_code: "+222" },
  { code: "MU", name: "Mauritius", dial_code: "+230" },
  { code: "MA", name: "Morocco", dial_code: "+212" },
  { code: "MZ", name: "Mozambique", dial_code: "+258" },
  { code: "NA", name: "Namibia", dial_code: "+264" },
  { code: "NE", name: "Niger", dial_code: "+227" },
  { code: "NG", name: "Nigeria", dial_code: "+234" },
  { code: "RW", name: "Rwanda", dial_code: "+250" },
  { code: "ST", name: "São Tomé & Príncipe", dial_code: "+239" },
  { code: "SN", name: "Senegal", dial_code: "+221" },
  { code: "SC", name: "Seychelles", dial_code: "+248" },
  { code: "SL", name: "Sierra Leone", dial_code: "+232" },
  { code: "SO", name: "Somalia", dial_code: "+252" },
  { code: "ZA", name: "South Africa", dial_code: "+27" },
  { code: "SS", name: "South Sudan", dial_code: "+211" },
  { code: "SD", name: "Sudan", dial_code: "+249" },
  { code: "TZ", name: "Tanzania", dial_code: "+255" },
  { code: "TG", name: "Togo", dial_code: "+228" },
  { code: "TN", name: "Tunisia", dial_code: "+216" },
  { code: "UG", name: "Uganda", dial_code: "+256" },
  { code: "ZM", name: "Zambia", dial_code: "+260" },
  { code: "ZW", name: "Zimbabwe", dial_code: "+263" },

  // Asia
  { code: "AF", name: "Afghanistan", dial_code: "+93" },
  { code: "AM", name: "Armenia", dial_code: "+374" },
  { code: "AZ", name: "Azerbaijan", dial_code: "+994" },
  { code: "BH", name: "Bahrain", dial_code: "+973" },
  { code: "BD", name: "Bangladesh", dial_code: "+880" },
  { code: "BT", name: "Bhutan", dial_code: "+975" },
  { code: "BN", name: "Brunei", dial_code: "+673" },
  { code: "KH", name: "Cambodia", dial_code: "+855" },
  { code: "CN", name: "China", dial_code: "+86" },
  { code: "GE", name: "Georgia", dial_code: "+995" },
  { code: "IN", name: "India", dial_code: "+91" },
  { code: "ID", name: "Indonesia", dial_code: "+62" },
  { code: "IR", name: "Iran", dial_code: "+98" },
  { code: "IQ", name: "Iraq", dial_code: "+964" },
  { code: "IL", name: "Israel", dial_code: "+972" },
  { code: "JP", name: "Japan", dial_code: "+81" },
  { code: "JO", name: "Jordan", dial_code: "+962" },
  { code: "KZ", name: "Kazakhstan", dial_code: "+7" },
  { code: "KW", name: "Kuwait", dial_code: "+965" },
  { code: "KG", name: "Kyrgyzstan", dial_code: "+996" },
  { code: "LA", name: "Laos", dial_code: "+856" },
  { code: "LB", name: "Lebanon", dial_code: "+961" },
  { code: "MY", name: "Malaysia", dial_code: "+60" },
  { code: "MV", name: "Maldives", dial_code: "+960" },
  { code: "MN", name: "Mongolia", dial_code: "+976" },
  { code: "MM", name: "Myanmar (Burma)", dial_code: "+95" },
  { code: "NP", name: "Nepal", dial_code: "+977" },
  { code: "KP", name: "North Korea", dial_code: "+850" },
  { code: "OM", name: "Oman", dial_code: "+968" },
  { code: "PK", name: "Pakistan", dial_code: "+92" },
  { code: "PS", name: "Palestine", dial_code: "+970" },
  { code: "PH", name: "Philippines", dial_code: "+63" },
  { code: "QA", name: "Qatar", dial_code: "+974" },
  { code: "RU", name: "Russia", dial_code: "+7" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966" },
  { code: "SG", name: "Singapore", dial_code: "+65" },
  { code: "KR", name: "South Korea", dial_code: "+82" },
  { code: "LK", name: "Sri Lanka", dial_code: "+94" },
  { code: "SY", name: "Syria", dial_code: "+963" },
  { code: "TW", name: "Taiwan", dial_code: "+886" },
  { code: "TJ", name: "Tajikistan", dial_code: "+992" },
  { code: "TH", name: "Thailand", dial_code: "+66" },
  { code: "TL", name: "Timor-Leste", dial_code: "+670" },
  { code: "TR", name: "Turkey", dial_code: "+90" },
  { code: "TM", name: "Turkmenistan", dial_code: "+993" },
  { code: "AE", name: "United Arab Emirates", dial_code: "+971" },
  { code: "UZ", name: "Uzbekistan", dial_code: "+998" },
  { code: "VN", name: "Vietnam", dial_code: "+84" },
  { code: "YE", name: "Yemen", dial_code: "+967" },

  // Europe
  { code: "AL", name: "Albania", dial_code: "+355" },
  { code: "AD", name: "Andorra", dial_code: "+376" },
  { code: "AT", name: "Austria", dial_code: "+43" },
  { code: "BY", name: "Belarus", dial_code: "+375" },
  { code: "BE", name: "Belgium", dial_code: "+32" },
  { code: "BA", name: "Bosnia & Herzegovina", dial_code: "+387" },
  { code: "BG", name: "Bulgaria", dial_code: "+359" },
  { code: "HR", name: "Croatia", dial_code: "+385" },
  { code: "CY", name: "Cyprus", dial_code: "+357" },
  { code: "CZ", name: "Czech Republic", dial_code: "+420" },
  { code: "DK", name: "Denmark", dial_code: "+45" },
  { code: "EE", name: "Estonia", dial_code: "+372" },
  { code: "FI", name: "Finland", dial_code: "+358" },
  { code: "FR", name: "France", dial_code: "+33" },
  { code: "DE", name: "Germany", dial_code: "+49" },
  { code: "GR", name: "Greece", dial_code: "+30" },
  { code: "HU", name: "Hungary", dial_code: "+36" },
  { code: "IS", name: "Iceland", dial_code: "+354" },
  { code: "IE", name: "Ireland", dial_code: "+353" },
  { code: "IT", name: "Italy", dial_code: "+39" },
  { code: "LV", name: "Latvia", dial_code: "+371" },
  { code: "LI", name: "Liechtenstein", dial_code: "+423" },
  { code: "LT", name: "Lithuania", dial_code: "+370" },
  { code: "LU", name: "Luxembourg", dial_code: "+352" },
  { code: "MT", name: "Malta", dial_code: "+356" },
  { code: "MD", name: "Moldova", dial_code: "+373" },
  { code: "MC", name: "Monaco", dial_code: "+377" },
  { code: "ME", name: "Montenegro", dial_code: "+382" },
  { code: "NL", name: "Netherlands", dial_code: "+31" },
  { code: "MK", name: "North Macedonia", dial_code: "+389" },
  { code: "NO", name: "Norway", dial_code: "+47" },
  { code: "PL", name: "Poland", dial_code: "+48" },
  
  { code: "PT", name: "Portugal", dial_code: "+351" },
  { code: "RO", name: "Romania", dial_code: "+40" },
  { code: "SM", name: "San Marino", dial_code: "+378" },
  { code: "RS", name: "Serbia", dial_code: "+381" },
  { code: "SK", name: "Slovakia", dial_code: "+421" },
  { code: "SI", name: "Slovenia", dial_code: "+386" },
  { code: "ES", name: "Spain", dial_code: "+34" },
  { code: "SE", name: "Sweden", dial_code: "+46" },
  { code: "CH", name: "Switzerland", dial_code: "+41" },
  { code: "UA", name: "Ukraine", dial_code: "+380" },
  { code: "GB", name: "United Kingdom", dial_code: "+44" },
  { code: "VA", name: "Vatican City", dial_code: "+39" },

  // North America
  { code: "AG", name: "Antigua & Barbuda", dial_code: "+1" },
  { code: "BS", name: "Bahamas", dial_code: "+1" },
  { code: "BB", name: "Barbados", dial_code: "+1" },
  { code: "BZ", name: "Belize", dial_code: "+501" },
  { code: "CA", name: "Canada", dial_code: "+1" },
  { code: "CR", name: "Costa Rica", dial_code: "+506" },
  { code: "CU", name: "Cuba", dial_code: "+53" },
  { code: "DM", name: "Dominica", dial_code: "+1" },
  { code: "DO", name: "Dominican Republic", dial_code: "+1" },
  { code: "SV", name: "El Salvador", dial_code: "+503" },
  { code: "GD", name: "Grenada", dial_code: "+1" },
  { code: "GT", name: "Guatemala", dial_code: "+502" },
  { code: "HT", name: "Haiti", dial_code: "+509" },
  { code: "HN", name: "Honduras", dial_code: "+504" },
  { code: "JM", name: "Jamaica", dial_code: "+1" },
  { code: "MX", name: "Mexico", dial_code: "+52" },
  { code: "NI", name: "Nicaragua", dial_code: "+505" },
  { code: "PA", name: "Panama", dial_code: "+507" },
  { code: "KN", name: "St. Kitts & Nevis", dial_code: "+1" },
  { code: "LC", name: "St. Lucia", dial_code: "+1" },
  { code: "VC", name: "St. Vincent & Grenadines", dial_code: "+1" },
  { code: "TT", name: "Trinidad & Tobago", dial_code: "+1" },
  { code: "US", name: "United States", dial_code: "+1" },

  // South America
  { code: "AR", name: "Argentina", dial_code: "+54" },
  { code: "BO", name: "Bolivia", dial_code: "+591" },
  { code: "BR", name: "Brazil", dial_code: "+55" },
  { code: "CL", name: "Chile", dial_code: "+56" },
  { code: "CO", name: "Colombia", dial_code: "+57" },
  { code: "EC", name: "Ecuador", dial_code: "+593" },
  { code: "GY", name: "Guyana", dial_code: "+592" },
  { code: "PY", name: "Paraguay", dial_code: "+595" },
  { code: "PE", name: "Peru", dial_code: "+51" },
  { code: "SR", name: "Suriname", dial_code: "+597" },
  { code: "UY", name: "Uruguay", dial_code: "+598" },
  { code: "VE", name: "Venezuela", dial_code: "+58" },

  // Oceania
  { code: "AU", name: "Australia", dial_code: "+61" },
  { code: "FJ", name: "Fiji", dial_code: "+679" },
  { code: "KI", name: "Kiribati", dial_code: "+686" },
  { code: "MH", name: "Marshall Islands", dial_code: "+692" },
  { code: "FM", name: "Micronesia", dial_code: "+691" },
  { code: "NR", name: "Nauru", dial_code: "+674" },
  { code: "NZ", name: "New Zealand", dial_code: "+64" },
  { code: "PW", name: "Palau", dial_code: "+680" },
  { code: "PG", name: "Papua New Guinea", dial_code: "+675" },
  { code: "WS", name: "Samoa", dial_code: "+685" },
  { code: "SB", name: "Solomon Islands", dial_code: "+677" },
  { code: "TO", name: "Tonga", dial_code: "+676" },
  { code: "TV", name: "Tuvalu", dial_code: "+688" },
  { code: "VU", name: "Vanuatu", dial_code: "+678" },

  // Caribbean (already included in North America but often grouped separately)
  // Note: Many Caribbean countries share +1 with specific area codes

  // Territories and Special Cases
  { code: "AQ", name: "Antarctica", dial_code: "+672" },
  { code: "HK", name: "Hong Kong SAR China", dial_code: "+852" },
  { code: "MO", name: "Macao SAR China", dial_code: "+853" },
  { code: "GL", name: "Greenland", dial_code: "+299" },
  { code: "PR", name: "Puerto Rico", dial_code: "+1" },
  { code: "GU", name: "Guam", dial_code: "+1" },
  { code: "VI", name: "U.S. Virgin Islands", dial_code: "+1" },
  { code: "MP", name: "Northern Mariana Islands", dial_code: "+1" },
  { code: "AS", name: "American Samoa", dial_code: "+1" }
];

interface CountryPhoneSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  phoneValue?: string;
  onPhoneChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CountryPhoneSelect({
  value = "+966",
  onChange,
  phoneValue = "",
  onPhoneChange,
  placeholder = "1551172132",
  className,
}: CountryPhoneSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleSelect = (dialCode: string) => {
    onChange?.(dialCode);
    setOpen(false);
  };

  const selectedCountry = COUNTRIES.find(
    (country) => country.dial_code === value
  ) || COUNTRIES[0];

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.code.toLowerCase().includes(search.toLowerCase()) ||
      country.dial_code.includes(search)
  );

  return (
    <div className={cn("flex gap-3", className)}>
      {/* Country Code Selector */}
      <div className="relative flex-shrink-0 w-[120px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between h-[50px] px-3 py-2 rounded-lg",
                "border border-gray-300 bg-white hover:bg-white hover:border-gray-400",
                "focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20",
                "shadow-sm hover:shadow data-[state=open]:shadow-lg data-[state=open]:border-gray-500"
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {selectedCountry && (
                  <>
                    <img
                      src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${selectedCountry.code.toLowerCase()}.svg`}
                      alt={`${selectedCountry.code} flag`}
                      className="w-6 h-4 object-contain flex-shrink-0"
                    />
                    <span className="truncate text-primary-text">
                      {selectedCountry.dial_code}
                    </span>
                  </>
                )}
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[280px] p-0 border-gray-200 bg-white shadow-lg rounded-lg"
            align="start"
          >
            <Command className="border-none">
              <div className="flex items-center border-b border-gray-200 px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                <CommandInput
                  placeholder="Search countries..."
                  value={search}
                  onValueChange={setSearch}
                  className="h-11 border-none focus:ring-0"
                />
              </div>
              <CommandList className="max-h-[300px]">
                <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                  No country found.
                </CommandEmpty>
                <CommandGroup>
                  {filteredCountries.map((country) => {
                    const isSelected = value === country.dial_code;
                    return (
                      <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={() => handleSelect(country.dial_code)}
                        className="cursor-pointer py-2.5 px-3 aria-selected:bg-gray-100"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${country.code.toLowerCase()}.svg`}
                              alt={`${country.code} flag`}
                              className="w-6 h-4 object-contain rounded-[2px]"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-primary-text">
                                {country.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {country.dial_code}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <ChevronDown className="h-4 w-4 text-gray-500 rotate-180" />
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Phone Number Input */}
      <div className="relative flex-1">
        <input
          type="tel"
          value={phoneValue}
          onChange={(e) => onPhoneChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full h-[50px] px-4 rounded-lg border border-gray-300 bg-white text-primary-text 
            placeholder:text-gray-400 placeholder:text-sm
            focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500
            hover:border-gray-400 transition-all duration-200 ease-in-out
            shadow-sm hover:shadow-md focus:shadow-lg"
        />
        <div className="absolute inset-0 rounded-lg ring-0 ring-gray-500/20 pointer-events-none transition-all duration-200" />
      </div>
    </div>
  );
}

// Usage example component
export function PhoneNumberSection() {
  const [countryCode, setCountryCode] = React.useState("+966");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm text-primary-text transition-colors duration-200">
        Phone Number
      </label>
      <CountryPhoneSelect
        value={countryCode}
        onChange={setCountryCode}
        phoneValue={phoneNumber}
        onPhoneChange={setPhoneNumber}
        placeholder="1551172132"
      />
      <p className="text-xs text-gray-500 pt-1">
        We'll only contact you about your inquiry
      </p>
    </div>
  );
}