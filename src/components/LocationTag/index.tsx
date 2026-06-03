import { MapPin } from '@phosphor-icons/react';

interface LocationProps {
  city: string;
  state: string;
}

export default function LocationTag({ city, state }: LocationProps) {
  return (
    <div className="flex flex-row p-2 rounded-md  bg-white/50 backdrop-blur-md shadow-sm gap-1 items-center">
      <MapPin size={24} weight="fill" className="fill-primary" />
      <div className="flex flex-row items-center">
        <p className="text-sm text-secundary font-semibold pr-1">{city},</p>
        <p className="text-sm text-secundary font-semibold">{state}</p>
      </div>
    </div>
  );
}
