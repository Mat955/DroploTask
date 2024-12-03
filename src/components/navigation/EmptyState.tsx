import {PlusCircleIcon} from "@heroicons/react/24/outline";

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({onAddClick}: EmptyStateProps) {
  return (
    <div className='w-full bg-white rounded-lg border border-[#EAECF0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]'>
      <div className='flex flex-col items-center justify-center py-8'>
        <h2 className='text-[#101828] text-base font-medium leading-6 mb-1'>
          Menu jest puste
        </h2>
        <p className='text-[#475467] text-sm leading-5 mb-5'>
          W tym menu nie ma jeszcze żadnych linków.
        </p>
        <button
          onClick={onAddClick}
          className='inline-flex items-center gap-2 px-[18px] py-2.5 bg-[#7F56D9] rounded-lg text-white text-sm font-semibold leading-5 hover:bg-[#7F56D9]/90 transition-colors'
        >
          <PlusCircleIcon className='w-5 h-5' />
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
