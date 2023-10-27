import Card from "@/components/ui/card";
import Link from "next/link";
import { FaDownload, FaSearch } from "react-icons/fa";


const InspectionUploadInfo = () => (
  <Card className="flex flex-row items-center justify-between gap-4 py-2 px-4">
    <div>
      Response File
      <div className="flex gap-2 items-center text-xs text-gray-500">
        <div className="w-[6px] h-[6px] bg-blue-500 rounded-full"></div>
        Uploaded 07/23/23</div>
    </div>
    <div className="flex justify-between gap-4 text-sm">
      <Link href="#"><FaSearch /></Link>
      <Link href="#"><FaDownload /></Link>
    </div>
  </Card>
);

export default InspectionUploadInfo;
