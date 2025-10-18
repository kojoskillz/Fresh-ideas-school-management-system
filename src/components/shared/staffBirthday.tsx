import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitial } from "@/lib/utils";

export default function StaffBirthday({
  isLoading,
  staffs,
}: {
  isLoading: boolean;
  staffs: [];
}) {
  return (
    <div className=" bg-white aspect-vide rounded-xl h-full p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="mb-4 text-xl text-primary font-semibold">
          Staff Birthday
        </h3>
        <Image src="/img2.png" width={50} height={50} alt="Birthday cake" />
      </div>
      <div className="flex">
        {isLoading ? (
          <Loader2 className="animate-spin text-primary/55 mx-auto mt-10" />
        ) : staffs.length > 0 ? (
          staffs.map((staff: any) => {
            return (
              <div key={staff._id} className="flex gap-2 items-center py-1">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={staff?.img_url} />
                  <AvatarFallback className="text-sm font-semibold bg-primary-foreground">
                    {getInitial(staff?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{staff.name}</span>
              </div>
            );
          })
        ) : (
          <span className="text-gray-600">
            No colleague&apos;s birthday today
          </span>
        )}
      </div>
    </div>
  );
}
