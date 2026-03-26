interface TopBarProps {
  studentName?: string;
}

export default function TopBar({ studentName }: TopBarProps) {
  return (
    <header className="bg-[#1F4E79] text-white sticky top-0 z-[100] h-14 shadow-md">
      <div className="max-w-4xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-wide leading-tight">SPC-Lab</span>
            <span className="text-xs text-blue-200 leading-tight">Precision Parts AB</span>
          </div>
        </div>
        {studentName && (
          <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
            {studentName}
          </div>
        )}
      </div>
    </header>
  );
}
