import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitial } from "@/lib/utils";

export default function StudentBirthday({
  isLoading,
  students,
}: {
  isLoading: boolean;
  students: [];
}) {
  return (
    <div className=" bg-white aspect-vide rounded-xl h-full p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="mb-4 text-xl text-primary font-semibold">
          Students Birthday
        </h3>
        <Image src="/img2.png" width={50} height={50} alt="Birthday cake" />
      </div>
      <div className="space-y-2">
        {isLoading ? (
          <Loader2 className="animate-spin text-primary/55 mx-auto mt-10" />
        ) : students.length > 0 ? (
          students.map((student: any) => {
            return (
              <div key={student._id} className="flex gap-2 items-center py-1">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={student?.img_url} />
                  <AvatarFallback className="text-sm font-semibold bg-primary-foreground">
                    {getInitial(student?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{student.name}</span>
              </div>
            );
          })
        ) : (
          <span className="text-gray-600">
            No student&apos;s birthday today
          </span>
        )}
      </div>
    </div>
  );
}
