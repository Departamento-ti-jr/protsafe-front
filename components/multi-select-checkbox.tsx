import { ReactNode, useState, useRef, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

export function MultiSelectCheckbox({
  options,
  value,
  onChange,
  label,
  icon,
}: {
  options: { label: string, value: string }[],
  value: string[],
  onChange: (val: string[]) => void,
  label?: string,
  icon?: ReactNode,
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);


  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter(item => item !== v));
    } else {
      onChange([...value, v]);
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      className="relative w-full"
      ref={ref}
      tabIndex={0}
      onBlur={(e) => {
        // Fecha apenas se o foco saiu COMPLETAMENTE do componente
        if (!ref.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      {label && (
        <label className="block text-sm font-medium mb-1 flex items-center gap-2">
          {icon}
          {label}
        </label>
      )}

      <div
        className="flex w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-wrap cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        {value.length === 0 && (
          <span className="text-[#6B3B0F]">Selecione o(s) motivo(s) de impugnação/recurso...</span>
        )}
        {value.map((val) => {
          const option = options.find((o) => o.value === val);
          if (!option) return null;
          return (
            <span
              key={val}
              className="flex items-center bg-modernize-gray-50 text-[#6B3B0F] rounded-xl px-2 py-0.5 text-xs mr-1 mb-1"
            >
              {option.label}
              <button
                className="ml-1 text-[#6B3B0F]"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((item) => item !== val));
                }}
                tabIndex={-1}
                type="button"
              >
                <X size={14} />
              </button>
            </span>
          );
        })}
        <span className="flex-1" />
      </div>

      {open && (
        <div className="absolute z-20 w-full mt-1 rounded-lg shadow-lg bg-white border max-h-64 overflow-auto">
          {/* Campo de busca */}
          <div className="p-2 border-b">
            <input
              autoFocus
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrar motivos..."
              className="w-full px-2 py-1 rounded border text-sm outline-none focus:border-amber-900"
              style={{ color: "#6B3B0F" }}
            />
          </div>

          {/* Lista filtrada */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                <Checkbox checked={value.includes(option.value)} className="mr-2" />
                <span className="text-sm">{option.label}</span>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 text-sm">
              Nenhuma opção encontrada.
            </div>
          )}
        </div>
      )}
    </div>
  );

}
