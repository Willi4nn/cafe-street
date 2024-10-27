import { MapPin } from "@phosphor-icons/react";

interface LocationProps {
  city: string;
  state: string;
}

export default function LocationTag({ city, state }: LocationProps) {
  return (
    <div className="flex flex-row p-2 rounded-md border-r-6 bg-primary/10">
      <MapPin size={24} weight="fill" className="fill-primary" />
      <div className="flex flex-row items-center">
        <p className="text-sm text-secundary font-semibold">{city},</p>
        <p className="text-sm text-secundary font-semibold">{state}</p>
      </div>
    </div>
  );
}