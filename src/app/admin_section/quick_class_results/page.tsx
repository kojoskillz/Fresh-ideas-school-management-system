"use client";

import AdminLayout from "@/components/layouts/admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/DeleteOutlined";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft } from "lucide-react";

const initialRows = [
  {
    id: 1,
    name: "Florence",
    admission_number: "100001",
    english: 65,
    mathematics: null,
    french: 60,
    social_stutides: undefined,
    science: 68,
    religion: 75,
    health_edu: 80,
    spellings: 58,
    computer: 67,
    phonics: 64,
    agric_science: 71,
    yoruba: 74,
    music: 63,
    creative_arts: 66,
    home_economics: 62,
    aptitude_test: 69,
  },
  {
    id: 2,
    name: "Joy",
    admission_number: "100002",
    english: 78,
    mathematics: 80,
    french: 85,
    social_stutides: 77,
    science: 82,
    religion: 79,
    health_edu: null,
    spellings: 75,
    computer: 84,
    phonics: 81,
    agric_science: 79,
    yoruba: 83,
    music: 76,
    creative_arts: 77,
    home_economics: 80,
    aptitude_test: 78,
  },
  {
    id: 3,
    name: "Florence",
    admission_number: "100003",
    english: 70,
    mathematics: 68,
    french: 65,
    social_stutides: 72,
    science: 69,
    religion: null,
    health_edu: 78,
    spellings: 62,
    computer: 66,
    phonics: 70,
    agric_science: 67,
    yoruba: 73,
    music: 61,
    creative_arts: 75,
    home_economics: 64,
    aptitude_test: 70,
  },
  {
    id: 4,
    name: "Joy",
    admission_number: "100004",
    english: 83,
    mathematics: 87,
    french: 90,
    social_stutides: 85,
    science: 86,
    religion: 88,
    health_edu: 89,
    spellings: 82,
    computer: 85,
    phonics: 80,
    agric_science: 84,
    yoruba: 86,
    music: 79,
    creative_arts: 88,
    home_economics: 81,
    aptitude_test: 83,
  },
  {
    id: 5,
    name: "Florence",
    admission_number: "100005",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 20,
    mathematics: 80,
    french: 79,
    social_stutides: 70,
    science: 50,
    religion: 60,
    health_edu: 90,
    spellings: 46,
    computer: 10,
    phonics: 55,
    agric_science: 10,
    yoruba: 80,
    music: 10,
    creative_arts: 80,
    home_economics: 40,
    aptitude_test: 20,
  },
  {
    id: 6,
    name: "Joy",
    admission_number: "100006",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 75,
    mathematics: 78,
    french: 72,
    social_stutides: 74,
    science: 70,
    religion: 76,
    health_edu: 79,
    spellings: 71,
    computer: 73,
    phonics: 77,
    agric_science: 75,
    yoruba: 80,
    music: 74,
    creative_arts: 76,
    home_economics: 73,
    aptitude_test: 78,
  },
  {
    id: 7,
    name: "Florence",
    admission_number: "100007",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 68,
    mathematics: 69,
    french: 64,
    social_stutides: 67,
    science: 66,
    religion: 70,
    health_edu: 71,
    spellings: 65,
    computer: 60,
    phonics: 68,
    agric_science: 64,
    yoruba: 70,
    music: 62,
    creative_arts: 66,
    home_economics: 68,
    aptitude_test: 70,
  },
  {
    id: 8,
    name: "Joy",
    admission_number: "100008",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 85,
    mathematics: 89,
    french: 91,
    social_stutides: 87,
    science: 90,
    religion: 88,
    health_edu: 92,
    spellings: 86,
    computer: 88,
    phonics: 87,
    agric_science: 90,
    yoruba: 89,
    music: 85,
    creative_arts: 90,
    home_economics: 87,
    aptitude_test: 91,
  },
  {
    id: 9,
    name: "Florence",
    admission_number: "100009",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 74,
    mathematics: 76,
    french: 70,
    social_stutides: 72,
    science: 71,
    religion: 73,
    health_edu: 74,
    spellings: 70,
    computer: 69,
    phonics: 72,
    agric_science: 71,
    yoruba: 75,
    music: 68,
    creative_arts: 74,
    home_economics: 70,
    aptitude_test: 73,
  },
  {
    id: 10,
    name: "Joy",
    admission_number: "100010",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 60,
    mathematics: 62,
    french: 59,
    social_stutides: 63,
    science: 65,
    religion: 61,
    health_edu: 66,
    spellings: 58,
    computer: 60,
    phonics: 64,
    agric_science: 63,
    yoruba: 66,
    music: 62,
    creative_arts: 64,
    home_economics: 65,
    aptitude_test: 61,
  },
  {
    id: 11,
    name: "Florence",
    admission_number: "100011",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 77,
    mathematics: 79,
    french: 75,
    social_stutides: 76,
    science: 78,
    religion: 80,
    health_edu: 81,
    spellings: 74,
    computer: 76,
    phonics: 77,
    agric_science: 75,
    yoruba: 79,
    music: 72,
    creative_arts: 78,
    home_economics: 74,
    aptitude_test: 76,
  },
  {
    id: 12,
    name: "Joy",
    admission_number: "100012",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 67,
    mathematics: 65,
    french: 69,
    social_stutides: 64,
    science: 68,
    religion: 70,
    health_edu: 72,
    spellings: 66,
    computer: 67,
    phonics: 68,
    agric_science: 66,
    yoruba: 70,
    music: 65,
    creative_arts: 69,
    home_economics: 67,
    aptitude_test: 68,
  },
  {
    id: 13,
    name: "Florence",
    admission_number: "100013",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 58,
    mathematics: 62,
    french: 57,
    social_stutides: 60,
    science: 59,
    religion: 63,
    health_edu: 65,
    spellings: 61,
    computer: 60,
    phonics: 62,
    agric_science: 61,
    yoruba: 64,
    music: 60,
    creative_arts: 63,
    home_economics: 62,
    aptitude_test: 60,
  },
  {
    id: 14,
    name: "Joy",
    admission_number: "100014",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 92,
    mathematics: 94,
    french: 90,
    social_stutides: 91,
    science: 93,
    religion: 95,
    health_edu: 96,
    spellings: 89,
    computer: 94,
    phonics: 92,
    agric_science: 93,
    yoruba: 95,
    music: 90,
    creative_arts: 94,
    home_economics: 91,
    aptitude_test: 93,
  },
  {
    id: 15,
    name: "Florence",
    admission_number: "100015",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 81,
    mathematics: 82,
    french: 79,
    social_stutides: 80,
    science: 83,
    religion: 85,
    health_edu: 87,
    spellings: 84,
    computer: 82,
    phonics: 85,
    agric_science: 80,
    yoruba: 84,
    music: 81,
    creative_arts: 86,
    home_economics: 83,
    aptitude_test: 84,
  },
  {
    id: 16,
    name: "Joy",
    admission_number: "100016",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 70,
    mathematics: 71,
    french: 73,
    social_stutides: 69,
    science: 72,
    religion: 74,
    health_edu: 75,
    spellings: 70,
    computer: 72,
    phonics: 73,
    agric_science: 71,
    yoruba: 74,
    music: 70,
    creative_arts: 75,
    home_economics: 72,
    aptitude_test: 73,
  },
  {
    id: 17,
    name: "Florence",
    admission_number: "100017",
    english: 88,
    mathematics: 85,
    french: 86,
    social_stutides: 84,
    science: 87,
    religion: 89,
    health_edu: 90,
    spellings: 83,
    computer: 86,
    phonics: 88,
    agric_science: 85,
    yoruba: 87,
    music: 84,
    creative_arts: 89,
    home_economics: 86,
    aptitude_test: 87,
  },
  {
    id: 18,
    name: "John Doe",
    admission_number: "100018",
    english: 59,
    mathematics: 61,
    french: 58,
    social_stutides: 60,
    science: 62,
    religion: 63,
    health_edu: 65,
    spellings: 57,
    computer: null,
    phonics: 61,
    agric_science: 60,
    yoruba: 64,
    music: 58,
    creative_arts: 63,
    home_economics: 60,
    aptitude_test: 62,
  },
  {
    id: 19,
    name: "Florence",
    admission_number: "100019",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 73,
    mathematics: 75,
    french: 70,
    social_stutides: 74,
    science: 72,
    religion: 76,
    health_edu: 78,
    spellings: 70,
    computer: null,
    phonics: 73,
    agric_science: 72,
    yoruba: 75,
    music: 71,
    creative_arts: 76,
    home_economics: 73,
    aptitude_test: 75,
  },
  {
    id: 20,
    name: "Joy",
    admission_number: "100020",
    class: "Basic 2 A",
    section: "Basic 2",
    english: 80,
    mathematics: 82,
    french: 81,
    social_stutides: 83,
    science: 85,
    religion: 84,
    health_edu: 87,
    spellings: 79,
    computer: 82,
    phonics: 83,
    agric_science: 80,
    yoruba: 86,
    music: 78,
    creative_arts: 85,
    home_economics: 81,
    aptitude_test: 84,
  },
];

export default function Page() {
  return (
    <AdminLayout page="Quick Class Results" header="Quick Class Results">
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        <div className="p-1 bg-white rounded-md">
          <div>
            <h4 className="text-xl lg:text-2xl border-b pb-1">
              My Result - ENGLISH LANGUAGE Basic Four White
            </h4>
            <div className="space-y-5 py-5">
              <div className="flex">
                <Label className="min-w-[100px]">
                  Session <sup>*</sup>
                </Label>
                <Input
                  value="2/24/2025"
                  className="border-0 bg-primary-foreground rounded-sm"
                />
              </div>
              <div className="flex">
                <Label className="min-w-[100px]">
                  Term <sup>*</sup>
                </Label>
                <Input
                  type="sm"
                  value="3rd"
                  className="border-0 bg-primary-foreground rounded-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[50px] border-primary/40 border text-center">
                    S/No
                  </TableHead>
                  <TableHead className="h-12 text-wrap whitespace-break-spaces text-center border border-primary/40">
                    Admisssion No
                  </TableHead>
                  <TableHead className="border border-primary/40 min-w-[200px]">
                    Name
                  </TableHead>
                  <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px]">
                    English
                  </TableHead>
                  <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px]">
                    Mathematics
                  </TableHead>

                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Science
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Social Studies
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Religion
                  </TableHead>
                  <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Health Education
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Computer/ICT
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    French
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Phonics
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Spellings
                  </TableHead>
                  <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Home Economics
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Aptitude Test
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Music
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Creative Art
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Yoruba
                  </TableHead>
                  <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Agricultural Science
                  </TableHead>
                  <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialRows.map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="text-center border border-primary/40">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-center border border-primary/40">
                        {row.admission_number}
                      </TableCell>
                      <TableCell className="border border-primary/40">
                        {row.name}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.english}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.mathematics}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.science}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.social_stutides}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.religion}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.health_edu}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.computer}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.french}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.phonics}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.spellings}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.home_economics}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.aptitude_test}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.music}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.creative_arts}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.yoruba}
                        </div>
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                          {row.agric_science}
                        </div>
                      </TableCell>
                      <TableCell
                        arial-label="Edit button"
                        className="border border-primary/40"
                      >
                        <Button variant="ghost" className="text-primary/50">
                          <Edit />
                        </Button>
                        <Button variant="ghost" className="text-red-400">
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col-reverse items-center gap-4 py-2 justify-between sm:flex-row">
            <div className="flex gap-1 items-center text-primary/70 text-sm">
              <span className="pl-1 text-sm">Showing </span>
              <span>1 - 8</span>
              <span>of</span>
              <span>20</span>
              <span>entries</span>
            </div>
            <div className="flex gap-2 items-centertext-primary/70">
              <Button size="sm" variant="ghost">
                <span className="hidden sm:block ">Previous</span>
                <ChevronLeft className="sm:hidden" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-[#494BDD] text-white"
              >
                1
              </Button>
              <Button size="sm" variant="outline">
                2
              </Button>
              <Button size="sm" variant="outline">
                3
              </Button>
              <Button size="sm" variant="ghost">
                <span className="hidden sm:block ">Previous</span>
                <ChevronRight className="sm:hidden" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
